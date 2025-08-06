"use client"

import Link from "next/link"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card" // Metrik kutucukları için
import { ServiceRequestCard } from "@/components/service-request-card"
import { HostingDomainCard } from "@/components/hosting-domain-card"
import { ProjectProgressCard } from "@/components/project-progress-card"
import { NotificationItem } from "@/components/notification-item"
import { motion } from "framer-motion"
import { Hourglass, Globe, Code } from "lucide-react" // Metrik ikonları

interface User {
  id: string
  name: string
  surname: string
  email: string
  phone: string
  is_admin: boolean
  created_at: string
}

interface ServiceRequest {
  project_id: string
  title: string
  status: "Beklemede" | "Baslandi" | "Devam" | "Tamamlandi"
  created_at: string | null
  estimated_end_date: string
  description: string
}

interface DomainInfo {
  id: string
  name: string
  registrationDate: string
  expirationDate: string
  status: string
}

interface HostingInfo {
  id: string
  planType: string
  diskUsageGB: number
  totalDiskGB: number
  expirationDate: string
  status: string
  controlPanelLink: string
}

interface UserProject {
  id: string
  name: string
  estimatedDeliveryDate: string
  status: "Tasarım" | "Geliştirme" | "Test" | "Yayında" | "Beklemede"
  milestones: { name: string; status: "Tamamlandı" | "Devam Ediyor" | "Beklemede" }[]
}

interface Notification {
  id: string
  type: "update" | "deadline" | "maintenance" | "new-feature"
  message: string
  date: string
  link?: string
}

export default function DashboardPage() {
  const router = useRouter()
  const [user, setUser] = useState<User | null>(null)
  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([])
  const [hostingDomains, setHostingDomains] = useState<{ domains: DomainInfo[]; hosting: HostingInfo } | null>(null)
  const [userProjects, setUserProjects] = useState<UserProject[]>([])
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isLoggedIn, setIsLoggedIn] = useState(true) // Simülasyon: Varsayılan olarak oturum açık

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/auth")
      return
    }

    async function fetchData() {
      try {
        const token = localStorage.getItem("token") // Simülasyon: Token'ı alıyoruz, gerçek uygulamada bu doğrulanmalı
        const [userRes, requestsRes, hostingDomainsRes, userProjectsRes, notificationsRes] = await Promise.all([
          fetch("/api/me"),
          fetch("/api/my-requests", { headers: { Authorization: `Bearer ${token}` } }),
          fetch("/api/hosting-domains"),
          fetch("/api/user-projects"),
          fetch("/api/notifications"),
        ])

        if (!userRes.ok || !requestsRes.ok || !hostingDomainsRes.ok || !userProjectsRes.ok || !notificationsRes.ok) {
          throw new Error("Veri çekilirken bir hata oluştu.")
        }

        const userData: User = await userRes.json()
        const requestsData: ServiceRequest[] = await requestsRes.json()
        const hostingDomainsData: { domains: DomainInfo[]; hosting: HostingInfo } = await hostingDomainsRes.json()
        const userProjectsData: UserProject[] = await userProjectsRes.json()
        const notificationsData: Notification[] = await notificationsRes.json()

        setUser(userData)
        setServiceRequests(requestsData)
        setHostingDomains(hostingDomainsData)
        setUserProjects(userProjectsData)
        setNotifications(notificationsData)
      } catch (e: any) {
        setError(e.message)
        setIsLoggedIn(false)
        router.push("/auth")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [isLoggedIn, router])

  const handleLogout = () => {
    setIsLoggedIn(false)
    router.push("/auth")
  }

  // Dashboard metrikleri hesaplama
  const activeProjectsCount = userProjects.filter(
    (p) => p.status === "Geliştirme" || p.status === "Tasarım" || p.status === "Test",
  ).length
  const pendingRequestsCount = serviceRequests.filter((r) => r.status === "Beklemede").length
  const expiringDomainsCount = hostingDomains
    ? hostingDomains.domains.filter((d) => {
        const now = new Date()
        const expiry = new Date(d.expirationDate)
        const diffDays = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
        return diffDays <= 30 && diffDays > 0 && d.status === "Aktif"
      }).length
    : 0

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p className="text-neon-blue text-xl">Kontrol paneli yükleniyor...</p>
      </div>
    )
  }

  if (error && !isLoggedIn) {
    return null
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-20 py-16 container mx-auto px-4">
        {/* Kullanıcı Karşılama Alanı */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-purple drop-shadow-md"
          >
            Hoş Geldiniz, {user?.name || "Müşteri"}!
          </motion.h1>
          <Button
            onClick={handleLogout}
            className="px-6 py-3 text-lg font-semibold bg-gradient-to-r from-destructive to-destructive/70 text-white rounded-full shadow-lg hover:shadow-destructive/50 transition-all duration-300 transform hover:scale-105"
          >
            Çıkış Yap
          </Button>
        </div>

        {/* İstatistik Özetleri (Metrik Kutucukları) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12"
        >
          <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Aktif Projeler</p>
                <h3 className="text-3xl font-bold text-neon-blue">{activeProjectsCount}</h3>
              </div>
              <Code className="w-10 h-10 text-neon-blue opacity-50" />
            </CardContent>
          </Card>
          <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Bekleyen Talepler</p>
                <h3 className="text-3xl font-bold text-neon-purple">{pendingRequestsCount}</h3>
              </div>
              <Hourglass className="w-10 h-10 text-neon-purple opacity-50" />
            </CardContent>
          </Card>
          <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg">
            <CardContent className="p-6 flex items-center justify-between">
              <div>
                <p className="text-muted-foreground text-sm">Yenileme Gereken Domain</p>
                <h3 className="text-3xl font-bold text-neon-green">{expiringDomainsCount}</h3>
              </div>
              <Globe className="w-10 h-10 text-neon-green opacity-50" />
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sol Sütun: Hizmet Talepleri ve Projelerim */}
          <div className="lg:col-span-2 space-y-8">
            {/* Hizmet Taleplerim */}
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-neon-blue drop-shadow-md mb-6">Hizmet Taleplerim</h2>
              {serviceRequests.length === 0 ? (
                <div className="text-center py-10 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-muted-foreground text-lg mb-4">Henüz hiç hizmet talebiniz yok.</p>
                  <Link href="/contact">
                    <Button className="px-6 py-3 text-md font-semibold bg-gradient-to-r from-neon-green to-neon-purple text-white rounded-full shadow-lg hover:shadow-neon-purple/50 transition-all duration-300">
                      Yeni Talep Oluşturun!
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {serviceRequests.map((request) => (
                    <ServiceRequestCard key={request.project_id} request={request} />
                  ))}
                </div>
              )}
            </motion.section>

            {/* Projelerim */}
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-neon-purple drop-shadow-md mb-6">Projelerim</h2>
              {userProjects.length === 0 ? (
                <div className="text-center py-10 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-muted-foreground text-lg mb-4">Devam eden projeniz bulunmamaktadır.</p>
                  <Link href="/projects">
                    <Button className="px-6 py-3 text-md font-semibold bg-gradient-to-r from-neon-blue to-neon-green text-white rounded-full shadow-lg hover:shadow-neon-blue/50 transition-all duration-300">
                      Tüm Projeleri Görüntüle
                    </Button>
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6">
                  {userProjects.map((project) => (
                    <ProjectProgressCard key={project.id} project={project} />
                  ))}
                </div>
              )}
            </motion.section>
          </div>

          {/* Sağ Sütun: Barındırma & Alan Adı ve Bildirimler */}
          <div className="lg:col-span-1 space-y-8">
            {/* Barındırma & Alan Adı Bilgileri */}
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              id="hosting-domain"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-neon-green drop-shadow-md mb-6">
                Barındırma & Alan Adı
              </h2>
              {hostingDomains ? (
                <div className="space-y-6">
                  {hostingDomains.domains.map((domain) => (
                    <HostingDomainCard key={domain.id} type="domain" data={domain} />
                  ))}
                  <HostingDomainCard type="hosting" data={hostingDomains.hosting} />
                </div>
              ) : (
                <div className="text-center py-10 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-muted-foreground text-lg">Barındırma ve alan adı bilgileri yüklenemedi.</p>
                </div>
              )}
            </motion.section>

            {/* Bildirimler & Güncellemeler */}
            <motion.section
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            >
              <h2 className="text-2xl md:text-3xl font-bold text-neon-blue drop-shadow-md mb-6">
                Bildirimler & Güncellemeler
              </h2>
              {notifications.length === 0 ? (
                <div className="text-center py-10 bg-white/5 rounded-xl border border-white/10">
                  <p className="text-muted-foreground text-lg">Henüz yeni bildiriminiz yok.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))}
                </div>
              )}
            </motion.section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
