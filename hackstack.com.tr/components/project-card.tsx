"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowRight, Edit, GitPullRequest } from "lucide-react"
import { motion } from "framer-motion"
import { formatDate } from "@/lib/utils"

interface ProjectCardProps {
  project: {
    id: string
    name: string
    description: string
    createdAt: string
    updatesCount: number
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.02, boxShadow: "0 0 20px rgba(0, 240, 255, 0.3)" }} // Neon mavi parıltı
      className="h-full"
    >
      <Card className="h-full flex flex-col bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg hover:border-neon-blue/50 transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-neon-blue text-2xl font-bold">{project.name}</CardTitle>
          <CardDescription className="text-muted-foreground text-sm">
            Oluşturulma Tarihi: {formatDate(project.createdAt)}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-foreground text-base">{project.description}</p>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          {project.updatesCount > 0 && (
            <div className="flex items-center text-sm text-neon-green mb-2">
              <GitPullRequest className="w-4 h-4 mr-1" />
              {project.updatesCount} Güncelleme
            </div>
          )}
          <div className="flex w-full gap-2">
            <Button
              variant="secondary"
              className="flex-1 bg-neon-purple/20 text-neon-purple hover:bg-neon-purple/30 border border-neon-purple/50"
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Detayları Görüntüle
            </Button>
            <Button
              variant="outline"
              className="flex-1 text-neon-green hover:text-neon-green/80 border border-neon-green/50 hover:bg-neon-green/10 bg-transparent"
            >
              <Edit className="w-4 h-4 mr-2" />
              Düzenle
            </Button>
          </div>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
