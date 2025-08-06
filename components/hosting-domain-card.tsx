"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Globe, Server, Calendar, HardDrive, LinkIcon, RefreshCcw, Clock } from "lucide-react"
import { motion } from "framer-motion"
import { formatDate } from "@/lib/utils"
import Link from "next/link"

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

interface HostingDomainCardProps {
  type: "domain" | "hosting"
  data: DomainInfo | HostingInfo
}

export function HostingDomainCard({ type, data }: HostingDomainCardProps) {
  const isDomain = type === "domain"
  const cardData = data as typeof isDomain extends true ? DomainInfo : HostingInfo

  const getStatusColor = (status: string, expirationDate?: string) => {
    if (expirationDate) {
      const now = new Date()
      const expiry = new Date(expirationDate)
      const diffDays = Math.ceil((expiry.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
      if (diffDays <= 30 && diffDays > 0) return "text-orange-400" // Yakında doluyor
      if (diffDays <= 0) return "text-destructive" // Süresi doldu
    }
    return status === "Aktif" ? "text-neon-green" : "text-muted-foreground"
  }

  const statusColor = getStatusColor(cardData.status, cardData.expirationDate)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ boxShadow: `0 0 20px ${statusColor.replace("text-", "")}30` }}
      className="h-full"
    >
      <Card
        className="h-full flex flex-col bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg hover:border-current transition-all duration-300"
        style={{ borderColor: statusColor.replace("text-", "") + "50" }}
      >
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-neon-blue text-xl font-semibold flex items-center gap-2">
            {isDomain ? <Globe className="w-5 h-5 text-neon-green" /> : <Server className="w-5 h-5 text-neon-purple" />}
            {isDomain ? cardData.name : cardData.planType}
          </CardTitle>
          <span className={`text-sm font-medium ${statusColor}`}>{cardData.status}</span>
        </CardHeader>
        <CardContent className="flex-grow space-y-2 text-muted-foreground text-sm">
          {isDomain ? (
            <>
              <p className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-neon-blue" />
                Kayıt Tarihi: {formatDate(cardData.registrationDate)}
              </p>
              <p className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-neon-purple" />
                Bitiş Tarihi: {formatDate(cardData.expirationDate)}
              </p>
              {new Date(cardData.expirationDate).getTime() - new Date().getTime() <= 30 * 24 * 60 * 60 * 1000 &&
                new Date(cardData.expirationDate).getTime() - new Date().getTime() > 0 && (
                  <p className="flex items-center gap-2 text-orange-400 font-semibold">
                    <Clock className="w-4 h-4" />
                    {Math.ceil(
                      (new Date(cardData.expirationDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24),
                    )}{" "}
                    gün kaldı!
                  </p>
                )}
              {new Date(cardData.expirationDate).getTime() - new Date().getTime() <= 0 && (
                <p className="flex items-center gap-2 text-destructive font-semibold">
                  <Clock className="w-4 h-4" />
                  Süresi Doldu!
                </p>
              )}
            </>
          ) : (
            <>
              <p className="flex items-center gap-2">
                <HardDrive className="w-4 h-4 text-neon-green" />
                Disk Kullanımı: {cardData.diskUsageGB} GB / {cardData.totalDiskGB} GB
              </p>
              <div className="w-full bg-muted rounded-full h-2.5">
                <div
                  className="bg-neon-blue h-2.5 rounded-full"
                  style={{ width: `${(cardData.diskUsageGB / cardData.totalDiskGB) * 100}%` }}
                ></div>
              </div>
              <p className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-neon-purple" />
                Bitiş Tarihi: {formatDate(cardData.expirationDate)}
              </p>
            </>
          )}
        </CardContent>
        <CardFooter>
          {isDomain ? (
            <Button
              variant="secondary"
              className="w-full bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 text-neon-blue hover:from-neon-blue/30 hover:to-neon-purple/30 border border-neon-blue/50 hover:border-neon-blue transition-all duration-300"
            >
              <RefreshCcw className="w-4 h-4 mr-2" />
              Yenile
            </Button>
          ) : (
            <Link href={cardData.controlPanelLink} target="_blank" rel="noopener noreferrer" className="w-full">
              <Button
                variant="secondary"
                className="w-full bg-gradient-to-r from-neon-green/20 to-neon-blue/20 text-neon-green hover:from-neon-green/30 hover:to-neon-blue/30 border border-neon-green/50 hover:border-neon-green transition-all duration-300"
              >
                <LinkIcon className="w-4 h-4 mr-2" />
                Kontrol Paneli
              </Button>
            </Link>
          )}
        </CardFooter>
      </Card>
    </motion.div>
  )
}
