"use client"

import { Button } from "@/components/ui/button"

import { Bell, Info, AlertCircle, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"
import { formatDate } from "@/lib/utils"
import Link from "next/link"

interface Notification {
  id: string
  type: "update" | "deadline" | "maintenance" | "new-feature"
  message: string
  date: string
  link?: string
}

interface NotificationItemProps {
  notification: Notification
}

export function NotificationItem({ notification }: NotificationItemProps) {
  const iconMap = {
    update: <Info className="w-5 h-5 text-neon-blue" />,
    deadline: <AlertCircle className="w-5 h-5 text-orange-400" />, // Kırmızı yerine turuncu, daha az agresif
    maintenance: <Bell className="w-5 h-5 text-neon-purple" />,
    "new-feature": <CheckCircle className="w-5 h-5 text-neon-green" />,
  }

  const textColor =
    notification.type === "deadline"
      ? "text-destructive" // Önemli bildirimler kırmızı
      : notification.type === "new-feature"
        ? "text-neon-green" // Yenilikler yeşil
        : "text-muted-foreground" // Rutin hatırlatmalar gri

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4 }}
      className="flex items-start gap-3 p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
    >
      <div className="flex-shrink-0 mt-1">{iconMap[notification.type]}</div>
      <div className="flex-grow">
        <p className={`text-sm ${textColor}`}>{notification.message}</p>
        <p className="text-muted-foreground text-xs mt-1">{formatDate(notification.date)}</p>
      </div>
      {notification.link && (
        <Link href={notification.link} className="flex-shrink-0">
          <Button variant="ghost" size="sm" className="text-neon-blue hover:text-neon-blue/80">
            Görüntüle
          </Button>
        </Link>
      )}
    </motion.div>
  )
}
