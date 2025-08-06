"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { User, Calendar, Check, Hourglass, Play, ArrowRight } from "lucide-react" // Sade ikonlar
import { motion } from "framer-motion"
import { formatDate } from "@/lib/utils"

interface Milestone {
  name: string
  status: "Tamamlandı" | "Devam Ediyor" | "Beklemede"
}

interface UserProject {
  id: string
  name: string
  estimatedDeliveryDate: string
  status: "Tasarım" | "Geliştirme" | "Test" | "Yayında" | "Beklemede"
  milestones: Milestone[]
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
            <span>Tahmini Teslim: {formatDate(project.estimatedDeliveryDate)}</span>
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
              {project.milestones.map((milestone, index) => (
                <div key={index} className="flex items-center gap-3 relative">
                  {/* Durum ikonu ve renkli nokta */}
                  <div
                    className={`absolute -left-4 top-0.5 flex items-center justify-center w-6 h-6 rounded-full border-2 ${getStatusColor(milestone.status).replace("text-", "border-")}`}
                    style={{ backgroundColor: "hsl(var(--background))" }}
                  >
                    {getMilestoneIcon(milestone.status)}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-foreground text-base font-medium">{milestone.name}</span>
                    <span className={`text-sm ${getStatusColor(milestone.status)}`}>{milestone.status}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button
            variant="secondary"
            className="w-full bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 text-neon-blue hover:from-neon-blue/30 hover:to-neon-purple/30 border border-neon-blue/50 hover:border-neon-blue transition-all duration-300"
          >
            Proje Detayları <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
