"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HostingDomainCard } from "@/components/hosting-domain-card"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { Globe, Server, ArrowLeft } from "lucide-react"

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

export default function HostingDomainsListPage() {
  const router = useRouter()
  const [domains, setDomains] = useState<DomainInfo[]>([])
  const [hosting, setHosting] = useState<HostingInfo | null>(null)
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
        const json: { domains: DomainInfo[]; hosting: HostingInfo | null } = await res.json()
        setDomains(json.domains || [])
        setHosting(json.hosting || null)
      } catch (e: any) {
        setError(e?.message || "Beklenmeyen hata")
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p className="text-neon-blue text-xl">Veriler yükleniyor...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-6">
        <p className="text-destructive text-xl">Hata: {error}</p>
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-purple drop-shadow-md">
            Tüm Domain ve Hostingler
          </h1>
          <Link href="/taleplerim">
            <Button variant="secondary" className="bg-neon-blue/20 text-neon-blue border border-neon-blue/50">
              Panele Dön
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 space-y-6"
          >
            <h2 className="text-2xl font-semibold text-neon-blue flex items-center gap-2">
              <Globe className="w-5 h-5 text-neon-green" />
              Alan Adlarım
            </h2>
            {domains.length === 0 ? (
              <div className="text-center py-10 bg-white/5 rounded-xl border border-white/10">
                <p className="text-muted-foreground">Henüz tanımlı domain bulunmuyor.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {domains.map((d) => (
                  <HostingDomainCard key={d.id} type="domain" data={d} />
                ))}
              </div>
            )}
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h2 className="text-2xl font-semibold text-neon-purple flex items-center gap-2">
              <Server className="w-5 h-5 text-neon-purple" />
              Hosting
            </h2>
            {hosting ? (
              <HostingDomainCard type="hosting" data={hosting} />
            ) : (
              <div className="text-center py-10 bg-white/5 rounded-xl border border-white/10">
                <p className="text-muted-foreground">Hosting bilgisi bulunamadı.</p>
              </div>
            )}
          </motion.section>
        </div>
      </main>
      <Footer />
    </div>
  )
}
