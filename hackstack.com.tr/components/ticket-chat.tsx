"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Paperclip, Send, X, ImageIcon, Loader2 } from "lucide-react"

type Attachment = {
  id: string
  name: string
  type: string
  size: number
  url: string // data URL for demo
}

type Message = {
  id: string
  ticketId: string
  author: "user" | "support"
  text: string
  attachments?: Attachment[]
  createdAt: string
}

export default function TicketChat({
  ticketId,
  title = "Mesajlaşma",
  pollMs = 10000,
}: {
  ticketId: string
  title?: string
  pollMs?: number
}) {
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [text, setText] = useState("")
  const [files, setFiles] = useState<File[]>([])
  const [previewOpen, setPreviewOpen] = useState(false)
  const [previewSrc, setPreviewSrc] = useState<string | null>(null)
  const [sending, setSending] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)
  const abortRef = useRef<AbortController | null>(null)

  const scrollToBottom = () => bottomRef.current?.scrollIntoView({ behavior: "smooth" })

  const fetchMessages = async () => {
    try {
      const res = await fetch(`/api/tickets/${encodeURIComponent(ticketId)}/messages`, { cache: "no-store" })
      const data: Message[] = await res.json()
      setMessages(data)
      setLoading(false)
      setTimeout(scrollToBottom, 50)
    } catch (err) {
      setLoading(false)
      // silently ignore for demo
    }
  }

  useEffect(() => {
    fetchMessages()
    const id = setInterval(fetchMessages, pollMs)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketId])

  const onPickFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return
    const list = Array.from(e.target.files)
    setFiles((prev) => [...prev, ...list].slice(0, 8)) // limit
    e.target.value = ""
  }

  const removeFile = (idx: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx))
  }

  const fileToDataURL = (file: File): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(String(reader.result))
      reader.onerror = reject
      reader.readAsDataURL(file)
    })

  const onSend = async () => {
    if (!text.trim() && files.length === 0) return
    setSending(true)
    abortRef.current?.abort()
    abortRef.current = new AbortController()
    try {
      const attachments: Attachment[] = []
      for (const f of files) {
        const url = await fileToDataURL(f)
        attachments.push({
          id: crypto.randomUUID(),
          name: f.name,
          type: f.type,
          size: f.size,
          url,
        })
      }
      const body = {
        author: "user",
        text: text.trim(),
        attachments,
      }
      const res = await fetch(`/api/tickets/${encodeURIComponent(ticketId)}/messages`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: { "Content-Type": "application/json" },
        signal: abortRef.current.signal,
      })
      if (res.ok) {
        const created: Message = await res.json()
        setMessages((prev) => [...prev, created])
        setText("")
        setFiles([])
        setTimeout(scrollToBottom, 50)
      }
    } catch (e) {
      // ignore
    } finally {
      setSending(false)
    }
  }

  const attachmentsGallery = messages.flatMap((m) => m.attachments ?? [])

  return (
    <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg h-full flex flex-col">
      <CardHeader>
        <CardTitle className="text-neon-green">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4 flex-1">
        <ScrollArea className="h-[360px] pr-2">
          {loading ? (
            <div className="h-[320px] flex items-center justify-center text-neon-blue">Mesajlar yükleniyor...</div>
          ) : messages.length === 0 ? (
            <div className="h-[320px] flex items-center justify-center text-muted-foreground text-sm">
              Henüz mesaj yok. İlk mesajı yazın.
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((msg) => {
                const isMe = msg.author === "user"
                return (
                  <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                    <div className={`flex items-end gap-2 max-w-[80%] ${isMe ? "flex-row-reverse" : ""}`}>
                      <Avatar className="size-8">
                        <AvatarFallback className="text-xs">{isMe ? "M" : "HS"}</AvatarFallback>
                      </Avatar>
                      <div
                        className={`rounded-lg px-3 py-2 border ${
                          isMe ? "bg-neon-blue/20 border-neon-blue/40" : "bg-white/10 border-white/15"
                        }`}
                      >
                        {msg.text && <p className="text-sm">{msg.text}</p>}
                        {msg.attachments && msg.attachments.length > 0 && (
                          <div className="mt-2 grid grid-cols-3 gap-2">
                            {msg.attachments.map((att) => (
                              <button
                                key={att.id}
                                className="relative group"
                                onClick={() => {
                                  setPreviewSrc(att.url)
                                  setPreviewOpen(true)
                                }}
                                aria-label="Önizleme"
                              >
                                {att.type.startsWith("image/") ? (
                                  <Image
                                    src={att.url || "/placeholder.svg"}
                                    alt={att.name}
                                    width={120}
                                    height={90}
                                    className="h-20 w-full object-cover rounded-md border border-white/10"
                                  />
                                ) : (
                                  <div className="h-20 rounded-md border border-white/10 bg-white/5 flex items-center justify-center text-xs text-muted-foreground">
                                    <ImageIcon className="w-4 h-4 mr-1" /> {att.name}
                                  </div>
                                )}
                              </button>
                            ))}
                          </div>
                        )}
                        <div className="mt-1 text-[10px] text-muted-foreground">
                          {new Date(msg.createdAt).toLocaleString("tr-TR")}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
              <div ref={bottomRef} />
            </div>
          )}
        </ScrollArea>

        {/* Attachment previews (selected but not sent yet) */}
        {files.length > 0 && (
          <div className="grid grid-cols-3 gap-2">
            {files.map((f, idx) => (
              <div key={idx} className="relative">
                <div className="absolute -top-2 -right-2">
                  <Button size="icon" variant="ghost" className="size-6" onClick={() => removeFile(idx)}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                <div className="h-20 rounded-md border border-white/10 bg-white/5 overflow-hidden flex items-center justify-center">
                  {f.type.startsWith("image/") ? (
                    <Image
                      src={URL.createObjectURL(f) || "/placeholder.svg"}
                      alt={f.name}
                      width={120}
                      height={90}
                      className="h-20 w-full object-cover"
                    />
                  ) : (
                    <div className="text-xs text-muted-foreground px-2 text-center">
                      <ImageIcon className="inline w-4 h-4 mr-1" />
                      {f.name}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Composer */}
        <div className="flex items-end gap-2">
          <div className="flex-1">
            <Textarea
              placeholder="Mesajınızı yazın..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[60px] bg-transparent border-white/15"
            />
            <div className="mt-2 flex items-center gap-2">
              <label className="inline-flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
                <Paperclip className="w-4 h-4" />
                Görsel/ek dosya ekle
                <Input type="file" accept="image/*" multiple onChange={onPickFiles} className="hidden" />
              </label>
              {files.length > 0 && (
                <span className="text-xs text-muted-foreground">({files.length} dosya eklendi)</span>
              )}
            </div>
          </div>
          <Button onClick={onSend} disabled={sending} className="shrink-0 bg-neon-blue text-white">
            {sending ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : <Send className="w-4 h-4 mr-2" />}
            Gönder
          </Button>
        </div>

        {/* Optional gallery of all images on this ticket */}
        {attachmentsGallery.length > 0 && (
          <div className="pt-2">
            <h4 className="text-sm font-semibold text-neon-purple mb-2">Örnek Resimler</h4>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2">
              {attachmentsGallery.map((att) =>
                att.type.startsWith("image/") ? (
                  <button
                    key={att.id}
                    onClick={() => {
                      setPreviewSrc(att.url)
                      setPreviewOpen(true)
                    }}
                    className="group relative"
                    aria-label="Önizleme"
                  >
                    <Image
                      src={att.url || "/placeholder.svg"}
                      alt={att.name}
                      width={240}
                      height={160}
                      className="h-24 w-full object-cover rounded-md border border-white/10"
                    />
                  </button>
                ) : null,
              )}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Not: Galeriye yeni örnek görseller eklemek için mesaj yazarken görsel ekleyin.
            </p>
          </div>
        )}
      </CardContent>

      {/* Lightbox */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-3xl border-white/10 bg-background/95">
          {previewSrc && (
            <Image
              src={previewSrc || "/placeholder.svg"}
              alt="Önizleme"
              width={1200}
              height={800}
              className="w-full h-auto rounded-md"
            />
          )}
        </DialogContent>
      </Dialog>
    </Card>
  )
}
