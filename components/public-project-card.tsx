"use client"

import Link from "next/link"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle, Hourglass } from "lucide-react"
import { motion } from "framer-motion"

interface PublicProjectCardProps {
  project: {
    id: string
    name: string
    description: string
    completionStatus: "Tamamlandı" | "Devam Ediyor" | "Yeni"
  }
}

export function PublicProjectCard({ project }: PublicProjectCardProps) {
  const statusColor =
    project.completionStatus === "Tamamlandı"
      ? "text-neon-green"
      : project.completionStatus === "Devam Ediyor"
        ? "text-neon-blue"
        : "text-neon-purple"

  const statusIcon =
    project.completionStatus === "Tamamlandı" ? (
      <CheckCircle className="w-4 h-4 mr-1" />
    ) : (
      <Hourglass className="w-4 h-4 mr-1" />
    )

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02, boxShadow: `0 0 20px ${statusColor.replace("text-", "")}30` }} // Dinamik neon parıltı
      className="h-full"
    >
      <Card
        className="h-full flex flex-col bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg hover:border-current transition-all duration-300"
        style={{ borderColor: statusColor.replace("text-", "") + "50" }}
      >
        <CardHeader>
          <CardTitle className="text-neon-blue text-2xl font-bold">{project.name}</CardTitle>
          <CardDescription className={`text-sm flex items-center ${statusColor}`}>
            {statusIcon}
            Durum: {project.completionStatus}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-foreground text-base">{project.description}</p>
        </CardContent>
        <CardFooter>
          <Link href={`/projects/${project.id}`} className="w-full">
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
