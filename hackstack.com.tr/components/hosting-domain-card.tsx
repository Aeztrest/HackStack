"use client"

import { useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Globe, Server, Calendar, HardDrive, LinkIcon, RefreshCcw, Clock, Info } from "lucide-react"
import { motion } from "framer-motion"
import { formatOnlyDate } from "@/lib/utils"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"

interface DomainInfo {
  id: string
  name: string
  registrationDate: string
  expirationDate: string
  status: string
}

interface HostingInfo {
  id: string
  name: string
  totalDiskGB: number
  registrationDate: string
  expirationDate: string
  status: string
  controlPanelLink: string
}

interface HostingDomainCardProps {
  type: "domain" | "hosting"
  data: DomainInfo | HostingInfo
}

export function HostingDomainCard({ type, data }: HostingDomainCardProps) {
  const isDomain = type === "domain"
  const cardData = data as any

  const [open, setOpen] = useState(false)

  const getStatusColor = (status: string, expirationDate?: string) => {
    if (expirationDate) {
      const now = new Date()
      const expiry = new Date(expirationDate)
      const diffDays = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      if (diffDays <= 30 && diffDays > 0) return "text-orange-400"
      if (diffDays <= 0) return "text-destructive"
    }
    return status === "Aktif" ? "text-neon-green" : "text-muted-foreground"
  }

  const statusColor = getStatusColor(cardData.status, cardData.expirationDate)

  const daysLeft =
    cardData.expirationDate !== undefined
      ? Math.ceil((new Date(cardData.expirationDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      : null

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        whileHover={{ boxShadow: `0 0 20px ${statusColor.replace("text-", "")}30` }}
        className="h-full"
      >
        <Card
          className="h-full flex flex-col bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg hover:border-current transition-all duration-300"
          style={{ borderColor: (statusColor.replace("text-", "") as string) + "50" }}
        >
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-neon-blue text-xl font-semibold flex items-center gap-2">
              {isDomain ? (
                <Globe className="w-5 h-5 text-neon-green" />
              ) : (
                <Server className="w-5 h-5 text-neon-purple" />
              )}
              {cardData.name}
            </CardTitle>
            <span className={`text-sm font-medium ${statusColor}`}>{cardData.status}</span>
          </CardHeader>
          <CardContent className="flex-grow space-y-2 text-muted-foreground text-sm">
            {isDomain ? (
              <>
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-neon-blue" />
                  Kayıt: {formatOnlyDate(cardData.registrationDate)}
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-neon-purple" />
                  Bitiş: {formatOnlyDate(cardData.expirationDate)}
                </p>
                {typeof daysLeft === "number" && (
                  <p
                    className={`flex items-center gap-2 font-semibold ${
                      daysLeft <= 0 ? "text-destructive" : daysLeft <= 30 ? "text-orange-400" : "text-muted-foreground"
                    }`}
                  >
                    <Clock className="w-4 h-4" />
                    {daysLeft <= 0 ? "Süresi Doldu" : `${daysLeft} gün kaldı`}
                  </p>
                )}
              </>
            ) : (
              <>
                <p className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-neon-green" />
                  Disk Alanı: {cardData.totalDiskGB} GB
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-neon-blue" />
                  Kayıt: {formatOnlyDate(cardData.registrationDate)}
                </p>
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-neon-purple" />
                  Bitiş: {formatOnlyDate(cardData.expirationDate)}
                </p>
              </>
            )}
          </CardContent>
          <CardFooter className="flex gap-2">
            {isDomain ? (
              <>
                <Button
                  variant="secondary"
                  className="w-1/2 bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 text-neon-blue hover:from-neon-blue/30 hover:to-neon-purple/30 border border-neon-blue/50 hover:border-neon-blue transition-all duration-300"
                >
                  <RefreshCcw className="w-4 h-4 mr-2" />
                  Yenile
                </Button>
                <Link href={`/taleplerim/domains/${cardData.id}`} className="w-1/2">
                  <Button
                    variant="outline"
                    className="w-full text-neon-green hover:text-neon-green/80 border border-neon-green/50 hover:bg-neon-green/10 bg-transparent"
                  >
                    <Info className="w-4 h-4 mr-2" />
                    İncele
                  </Button>
                </Link>
              </>
            ) : (
              <Button
                onClick={() => setOpen(true)}
                variant="secondary"
                className="w-full bg-gradient-to-r from-neon-green/20 to-neon-blue/20 text-neon-green hover:from-neon-green/30 hover:to-neon-blue/30 border border-neon-green/50 hover:border-neon-green transition-all duration-300"
              >
                <LinkIcon className="w-4 h-4 mr-2" />
                Hosting Detayları
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>

      {/* Hosting Info Modal */}
      {!isDomain && (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="bg-white/5 backdrop-blur-sm border border-white/10">
            <DialogHeader>
              <DialogTitle className="text-neon-blue">{cardData.name} - Hosting Bilgileri</DialogTitle>
              <DialogDescription className="text-muted-foreground">
                Kontrol paneli henüz hazır değil. Aşağıda temel barındırma bilgileriniz yer alır.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                <span className="text-foreground font-medium">Durum:</span> {cardData.status}
              </p>
              <p>
                <span className="text-foreground font-medium">Toplam Disk:</span> {cardData.totalDiskGB} GB
              </p>
              <p>
                <span className="text-foreground font-medium">Kayıt Tarihi:</span>{" "}
                {formatOnlyDate(cardData.registrationDate)}
              </p>
              <p>
                <span className="text-foreground font-medium">Bitiş Tarihi:</span>{" "}
                {formatOnlyDate(cardData.expirationDate)}
              </p>
            </div>
            <DialogFooter className="flex gap-2">
              <Link href="/taleplerim/hosting-domains">
                <Button variant="outline" className="text-neon-blue border-neon-blue/50 bg-transparent">
                  Tüm Domain & Hostingler
                </Button>
              </Link>
              <Button onClick={() => setOpen(false)} className="bg-neon-green text-white">
                Kapat
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  )
}
