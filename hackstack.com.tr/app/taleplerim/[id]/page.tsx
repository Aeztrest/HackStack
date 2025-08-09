    "use client"

    import { useEffect, useMemo, useState } from "react"
    import { useRouter, useParams } from "next/navigation"
    import Link from "next/link"
    import { Header } from "@/components/header"
    import { Footer } from "@/components/footer"
    import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
    import { Button } from "@/components/ui/button"
    import { Calendar, User, ArrowLeft, Check, Hourglass, Play, ListChecks, MessageSquare } from "lucide-react"
    import { formatDate, cn } from "@/lib/utils"
    import { motion } from "framer-motion"
    import TicketChat from "@/components/ticket-chat"

    type PhaseStatus = "Beklemede" | "Devam Ediyor" | "Test Ediliyor" | "Tamamlandı"
    type ProjectStatus = "Beklemede" | "Başlandı" | "Devam Ediyor" | "Tamamlandı"

    interface ProjectDetail {
    project_id: string
    name: string
    description: string
    created_at: string | null
    estimated_end_date: string
    status: ProjectStatus
    design_approval: PhaseStatus
    frontend_development: PhaseStatus
    backend_development: PhaseStatus
    backend_integration: PhaseStatus
    testing: PhaseStatus
    updater_name: string
    last_update: string
    updates: { created_at: string; note: string }[]
    }

    function normalizeAnyDetail(anyData: any, fallbackId: string): ProjectDetail {
    if (!anyData) throw new Error("Boş veri")
    if ("project_id" in anyData) return anyData as ProjectDetail
    if ("id" in anyData && "projectName" in anyData) {
        return {
        project_id: anyData.id || fallbackId,
        name: anyData.projectName,
        description: anyData.details ?? "",
        created_at: anyData.requestDate ?? null,
        estimated_end_date: anyData.requestDate ?? new Date().toISOString(),
        status: (anyData.status as ProjectStatus) ?? "Beklemede",
        design_approval: "Devam Ediyor",
        frontend_development: "Beklemede",
        backend_development: "Beklemede",
        backend_integration: "Beklemede",
        testing: "Beklemede",
        updater_name: "Hackstack",
        last_update: anyData.requestDate ?? new Date().toISOString(),
        updates: [{ created_at: anyData.requestDate ?? new Date().toISOString(), note: anyData.details ?? "" }],
        }
    }
    throw new Error("Tanımsız veri formatı")
    }

    function statusIcon(status: string) {
    if (status === "Tamamlandı") return <Check className="w-4 h-4 text-neon-green" />
    if (status === "Devam Ediyor") return <Hourglass className="w-4 h-4 text-neon-blue" />
    return <Play className="w-4 h-4 text-neon-purple" />
    }

    function statusColor(status: string) {
    if (status === "Tamamlandı") return "text-neon-green"
    if (status === "Devam Ediyor" || status === "Başlandı") return "text-neon-blue"
    return "text-neon-purple"
    }

    export default function ProjectDetailPage() {
    const router = useRouter()
    const params = useParams<{ id: string }>()
    const id = params?.id
    const [data, setData] = useState<ProjectDetail | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!id) return
        const token = typeof window !== "undefined" ? localStorage.getItem("token") : null
        if (!token) {
        router.push("/auth")
        return
        }
        async function load() {
        try {
            const res = await fetch(`/api/user-projects/${id}`, { headers: { Authorization: `Bearer ${token}` } })
            if (res.ok) {
            const raw = await res.json()
            const normalized = normalizeAnyDetail(raw, id)
            setData(normalized)
            } else {
            const listRes = await fetch("/api/user-projects", {
                headers: { Authorization: `Bearer ${token}` },
            })
            if (!listRes.ok) throw new Error("Proje listesi alınamadı")
            const list: any[] = await listRes.json()
            const found = list.find((p: any) => p.project_id === id)
            if (!found) throw new Error("Proje bulunamadı")
            setData(normalizeAnyDetail(found, id))
            }
        } catch (e: any) {
            setError(e?.message || "Beklenmeyen hata")
        } finally {
            setLoading(false)
        }
        }
        load()
    }, [id, router])

    const milestones = useMemo(
        () =>
        data
            ? [
                { key: "design_approval", name: "Tasarım Onayı", status: data.design_approval },
                { key: "frontend_development", name: "Frontend Geliştirme", status: data.frontend_development },
                { key: "backend_development", name: "Backend Geliştirme", status: data.backend_development },
                { key: "backend_integration", name: "Backend Entegrasyonu", status: data.backend_integration },
                { key: "testing", name: "Test Aşaması", status: data.testing },
            ]
            : [],
        [data],
    )

    if (loading) {
        return (
        <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
            <p className="text-neon-blue text-xl">Proje detayları yükleniyor...</p>
        </div>
        )
    }

    if (error || !data) {
        return (
        <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center gap-6">
            <p className="text-destructive text-xl">Hata: {error || "Proje bulunamadı"}</p>
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
            <Link href="/taleplerim">
                <Button variant="secondary" className="bg-neon-blue/20 text-neon-blue border border-neon-blue/50">
                Panele Dön
                </Button>
            </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left: Project info */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-2"
            >
                <Card className="bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg">
                <CardHeader>
                    <CardTitle className="text-3xl font-bold text-neon-blue">{data.name}</CardTitle>
                    <div className={cn("mt-2 flex items-center gap-3 text-sm", statusColor(data.status))}>
                    {statusIcon(data.status)}
                    <span className="font-medium">Durum: {data.status}</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-6 text-muted-foreground text-sm">
                    {data.created_at && (
                        <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-neon-purple" />
                        Başlangıç: {formatDate(data.created_at)}
                        </span>
                    )}
                    <span className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-neon-green" />
                        Tahmini Teslim: {formatDate(data.estimated_end_date)}
                    </span>
                    <span className="flex items-center gap-2">
                        <User className="w-4 h-4 text-neon-blue" />
                        Güncelleyen: {data.updater_name}
                    </span>
                    </div>
                </CardHeader>
                <CardContent className="space-y-8">
                    {data.description && (
                    <section>
                        <h3 className="text-xl font-semibold mb-2">Açıklama</h3>
                        <p className="text-muted-foreground">{data.description}</p>
                    </section>
                    )}

                    <section>
                    <h3 className="text-xl font-semibold mb-4">Kilometre Taşları</h3>
                    <div className="relative pl-4">
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white/10 rounded-full"></div>
                        <div className="space-y-4">
                        {milestones.map((m) => (
                            <div key={m.key} className="flex items-center gap-3 relative">
                            <div
                                className={cn(
                                "absolute -left-4 top-0.5 flex items-center justify-center w-6 h-6 rounded-full border-2",
                                statusColor(m.status).replace("text-", "border-"),
                                )}
                                style={{ backgroundColor: "hsl(var(--background))" }}
                            >
                                {statusIcon(m.status)}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-foreground text-base font-medium">{m.name}</span>
                                <span className={cn("text-sm", statusColor(m.status))}>{m.status}</span>
                            </div>
                            </div>
                        ))}
                        </div>
                    </div>
                    </section>

                    {data.updates?.length > 0 && (
                    <section>
                        <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                        <ListChecks className="w-5 h-5 text-neon-blue" />
                        Güncelleme Geçmişi
                        </h3>
                        <div className="space-y-3">
                        {data.updates.map((u, idx) => (
                            <div
                            key={idx}
                            className="p-3 rounded-lg bg-white/5 border border-white/10 flex items-start justify-between"
                            >
                            <p className="text-sm text-foreground">{u.note}</p>
                            <span className="text-xs text-muted-foreground">{formatDate(u.created_at)}</span>
                            </div>
                        ))}
                        </div>
                    </section>
                    )}
                </CardContent>
                </Card>
            </motion.div>

            {/* Right: Ticket chat */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-1"
            >
                <TicketChat ticketId={String(id)} title="Ticket & Mesajlaşma" />
                <div className="mt-4 text-center">
                <MessageSquare className="inline w-4 h-4 mr-1 text-neon-blue" />
                <span className="text-xs text-muted-foreground">
                    Müşterileriniz bu alandan görsel örnek ekleyip isteklerini iletebilir.
                </span>
                </div>
            </motion.div>
            </div>
        </main>
        <Footer />
        </div>
    )
    }
