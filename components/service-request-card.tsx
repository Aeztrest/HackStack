"use client"

import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Check, Hourglass, Clock } from "lucide-react" // Sade ikonlar
import { motion } from "framer-motion"
import { formatDate } from "@/lib/utils"

interface ServiceRequestCardProps {
  request: {
    project_id: string
    title: string
    status: "Beklemede" | "Baslandi" | "Devam" | "Tamamlandi"
    estimated_end_date: string
    created_at: string | null // Yeni alan
    description: string
  }
}

export function ServiceRequestCard({ request }: ServiceRequestCardProps) {
  const statusColor =
    request.status === "Tamamlandi"
      ? "text-neon-green"
      : request.status === "Devam"
        ? "text-neon-blue"
        : "text-neon-purple"

  const statusIcon =
    request.status === "Tamamlandi" ? (
      <Check className="w-4 h-4 mr-1" />
    ) : request.status === "Devam" ? (
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
          <CardTitle className="text-neon-blue text-xl font-semibold">{request.title}</CardTitle>
          <div className={`text-sm flex items-center ${statusColor}`}>
            {statusIcon}
            <span className="font-medium">Durum: {request.status}</span>
          </div>
        </CardHeader>
        <CardContent className="flex-grow text-muted-foreground text-sm space-y-1">
          {request.created_at && <p>Başlangıç Tarihi: {formatDate(request.created_at)}</p>}
          <p>Tahimini Bitiş Tarihi: {formatDate(request.estimated_end_date)}</p>
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
