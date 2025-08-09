"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Hourglass, Clock } from "lucide-react" // Sade ikonlar
import { motion } from "framer-motion"
import { formatOnlyDate } from "@/lib/utils"

interface ProjectRequestCardProps {
  request: {
    project_id: string
    name: string
    description: string
    created_at: string | null
    estimated_end_date: string
    status: "Beklemede" | "Başlandı" | "Devam Ediyor" | "Tamamlandı"
    design_approval: "Beklemede" | "Devam Ediyor" | "Test Ediliyor" | "Tamamlandı"
    frontend_development: "Beklemede" | "Devam Ediyor" | "Test Ediliyor" | "Tamamlandı"
    backend_development: "Beklemede" | "Devam Ediyor" | "Test Ediliyor" | "Tamamlandı"
    backend_integration: "Beklemede" | "Devam Ediyor" | "Test Ediliyor" | "Tamamlandı"
    testing: "Beklemede" | "Devam Ediyor" | "Test Ediliyor" | "Tamamlandı"
    updater_name: string
    last_update: string
    updates: {
      created_at: string
      note: string
    }[]
  }
}

export function ProjectRequestCard({ request }: ProjectRequestCardProps) {
  const statusColor =
    request.status === "Tamamlandı"
      ? "text-neon-green"
      : request.status === "Devam Ediyor"
        ? "text-neon-blue"
        : "text-neon-purple"

  const statusIcon =
    request.status === "Tamamlandı" ? (
      <Check className="w-4 h-4 mr-1" />
    ) : request.status === "Devam Ediyor" ? (
      <Hourglass className="w-4 h-4 mr-1" />
    ) : (
      <Clock className="w-4 h-4 mr-1" />
    )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ boxShadow: `0 0 20px ${statusColor.replace("text-", "")}30` }} // Dinamik neon parıltı
      className="h-full"
    >
      <Card
        className="h-full flex flex-col bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg hover:border-current transition-all duration-300"
        style={{ borderColor: statusColor.replace("text-", "") + "50" }}
      >
        <CardHeader>
          <CardTitle className="text-neon-blue text-xl font-semibold">{request.name}</CardTitle>
          <div className={`text-sm flex items-center ${statusColor}`}>
            {statusIcon}
            <span className="font-medium">Durum: {request.status}</span>
          </div>
        </CardHeader>
        <CardContent className="flex-grow text-muted-foreground text-sm space-y-1">
          {request.created_at && <p>Başlangıç Tarihi: {formatOnlyDate(request.created_at)}</p>}
          <p>Tahmini Bitiş Tarihi: {formatOnlyDate(request.estimated_end_date)}</p>
          {request.description && <p>Açıklama: {request.description}</p>}
        </CardContent>
        <CardFooter>
          <Link href={`/taleplerim/${request.project_id}`} className="w-full">
            <Button
              variant="secondary"
              className="w-full bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 text-neon-blue hover:from-neon-blue/30 hover:to-neon-purple/30 border border-neon-blue/50 hover:border-neon-blue transition-all duration-300"
            >
              Detayları Görüntüle <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
