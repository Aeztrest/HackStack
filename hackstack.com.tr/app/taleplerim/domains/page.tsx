"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Globe, ArrowLeft, Clock } from "lucide-react"
import { formatOnlyDate } from "@/lib/utils"
import { motion } from "framer-motion"

interface DomainInfo {
  id: string
  name: string
  registrationDate: string
  expirationDate: string
  status: string
}

export default function DomainDetailPage() {
  const params = useParams<{ id: string }>()
  const id = params?.id
  const router = useRouter()
  const [domain, setDomain] = useState<DomainInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      router.push("/auth")
      return
    }
    async function load() {
      try {
        const res = await fetch("/api/hosting-domains", {
          headers: { Authorization: `Bearer ${token}` },
          cache: "no-store",
        })
        if (!res.ok) throw new Error("Veriler alınamadı")
        const json: { domains: DomainInfo[] } = await res.json()
        const found = json.domains.find((d) => d.id === id)
        if (!found) throw new Error("Domain bulunamadı")
        setDomain(found)
      } catch (e: any) {
        setError(e?.message || "Beklenmeyen hata")
      } finally {
        setLoading(false)
      }
    }
    if (id) load()
  }, [id, router])

  const daysLeft = domain
    ? Math.ceil((new Date(domain.expirationDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : null

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p className="text-neon-blue text-xl">Domain detayları yükleniyor...</p>
      </div>
    )
  }

  if (error || !domain) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-6">
        <p className="text-destructive text-xl">Hata: {error || "Domain bulunamadı"}</p>
        <Button onClick={() => router.back()} className="bg-neon-blue text-white">
          <ArrowLeft className="w-4 h-4 mr-2" /> Geri Dön
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-20 py-16 container mx-auto px-4">
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => router.back()} className="text-neon-blue hover:text-neon-green">
            <ArrowLeft className="w-4 h-4 mr-2" /> Geri
          </Button>
        </div>

        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-neon-blue flex items-center gap-2">
                <Globe className="w-6 h-6 text-neon-green" />
                {domain.name}
              </CardTitle>
              <div className="mt-2 text-sm">
                <span className={domain.status === "Aktif" ? "text-neon-green" : "text-muted-foreground"}>
                  Durum: {domain.status}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4 text-sm text-muted-foreground">
              <p className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-neon-blue" />
                Kayıt Tarihi: {formatOnlyDate(domain.registrationDate)}
              </p>
              <p className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-neon-purple" />
                Bitiş Tarihi: {formatOnlyDate(domain.expirationDate)}
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
              <div className="pt-4 flex gap-3">
                <Button className="bg-neon-blue text-white">Yenileme Talebi Oluştur</Button>
                <Link href="/taleplerim/hosting-domains">
                  <Button
                    variant="secondary"
                    className="bg-neon-purple/20 text-neon-purple border border-neon-purple/50"
                  >
                    Tüm Domain ve Hostingler
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
