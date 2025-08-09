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
    link: string
  }
}

export function PublicProjectCard({ project }: PublicProjectCardProps) {

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="h-full"
    >
      <Card
        className="h-full flex flex-col bg-white/5 backdrop-blur-sm border border-white/10 shadow-lg hover:border-current transition-all duration-300"
      >
        <CardHeader>
          <CardTitle className="text-neon-blue text-2xl font-bold">{project.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-foreground text-base">{project.description}</p>
        </CardContent>
        <CardFooter>
          <Link href={project.link} className="w-full">
            <Button
              variant="secondary"
              className="w-full bg-gradient-to-r from-neon-blue/20 to-neon-purple/20 text-neon-blue hover:from-neon-blue/30 hover:to-neon-purple/30 border border-neon-blue/50 hover:border-neon-blue transition-all duration-300"
            >
              Projeyi Görüntüle <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </motion.div>
  )
}
