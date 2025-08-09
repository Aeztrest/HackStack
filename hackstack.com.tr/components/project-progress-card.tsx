"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar, Check, Hourglass, Play, ArrowRight } from "lucide-react" // Sade ikonlar
import { motion } from "framer-motion"
import { formatOnlyDate } from "@/lib/utils"
import Link from "next/link"

interface UserProject {
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

interface ProjectProgressCardProps {
  project: UserProject
}

const getStatusIcon = (status: string) => {
  switch (status) {
    case "Tamamlandı":
      return <Check className="w-4 h-4 text-neon-green" />
    case "Devam Ediyor":
      return <Hourglass className="w-4 h-4 text-neon-blue" />
    case "Beklemede":
      return <Play className="w-4 h-4 text-neon-purple" />
    default:
      return null
  }
}

export function ProjectProgressCard({ project }: ProjectProgressCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Tamamlandı":
      case "Yayında":
        return "text-neon-green"
      case "Devam Ediyor":
      case "Geliştirme":
      case "Test":
        return "text-neon-blue"
      case "Beklemede":
      case "Tasarım":
        return "text-neon-purple"
      default:
        return "text-muted-foreground"
    }
  }

  const getMilestoneIcon = (status: string) => {
    switch (status) {
      case "Tamamlandı":
        return <Check className="w-4 h-4 text-neon-green" />
      case "Devam Ediyor":
        return <Hourglass className="w-4 h-4 text-neon-blue" />
      case "Beklemede":
        return <Play className="w-4 h-4 text-neon-purple" />
      default:
        return null
    }
  }

  const currentStatusColor = getStatusColor(project.status)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ boxShadow: `0 0 20px ${currentStatusColor.replace("text-", "")}30` }}
      className="h-full"
    >
      <Card
        className="h-full flex flex-col bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg hover:border-current transition-all duration-300"
        style={{ borderColor: currentStatusColor.replace("text-", "") + "50" }}
      >
        <CardHeader>
          <CardTitle className="text-neon-blue text-xl font-semibold">{project.name}</CardTitle>
          <div className="flex items-center gap-2 text-muted-foreground text-sm">
            <Calendar className="w-4 h-4 text-neon-purple" />
            <span>Tahmini Teslim: {formatOnlyDate(project.estimated_end_date)}</span>
          </div>
          <div className={`flex items-center gap-2 text-sm font-medium ${currentStatusColor}`}>
            {getStatusIcon(project.status)}
            <span>Durum: {project.status}</span>
          </div>
        </CardHeader>
        <CardContent className="flex-grow">
          <h4 className="text-lg font-semibold text-foreground mb-3">Kilometre Taşları:</h4>
          <div className="relative pl-4">
            {/* Dikey çizgi */}
            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-white/10 rounded-full"></div>
            <div className="space-y-4">
              {[
                { key: "design_approval", name: "Tasarım Onayı", status: project.design_approval },
                { key: "frontend_development", name: "Frontend Geliştirme", status: project.frontend_development },
                { key: "backend_development", name: "Backend Geliştirme", status: project.backend_development },
                { key: "backend_integration", name: "Backend Entegrasyonu", status: project.backend_integration },
                { key: "testing", name: "Test Aşaması", status: project.testing },
              ].map((milestone, index) => (
                <div key={milestone.key} className="flex items-center gap-3 relative">
                  {/* Durum ikonu ve renkli nokta */}
                  <div
                    className={`absolute -left-4 top-0.5 flex items-center justify-center w-6 h-6 rounded-full border-2 ${getStatusColor(milestone.status).replace("text-", "border-")}`}
                    style={{ backgroundColor: "hsl(var(--background))" }}
                  >
                    {getMilestoneIcon(milestone.status)}
                  </div>
                  <div className="flex flex-col pl-4">
                    <span className="text-foreground text-base font-medium">{milestone.name}</span>
                    <span className={`text-sm ${getStatusColor(milestone.status)}`}>{milestone.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Link href={`/taleplerim/${project.project_id}`} className="w-full">
            <Button
              variant="secondary"
              className="w-full bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 text-neon-blue hover:from-neon-blue/30 hover:to-neon-purple/30 border border-neon-blue/50 hover:border-neon-blue transition-all duration-300"
            >
              Proje Detayları <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
