"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { PublicProjectCard } from "@/components/public-project-card" // Yeni bileşeni içe aktarıyoruz
import { motion } from "framer-motion"
import Link from "next/link"

interface Project {
  id: string
  name: string
  description: string
  createdAt: string // Bu alan API'den geliyor ama PublicProjectCard'da kullanılmıyor
  updatesCount: number // Bu alan API'den geliyor ama PublicProjectCard'da kullanılmıyor
  link: string
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const response = await fetch("/api/projects")
        if (!response.ok) {
          throw new Error(`HTTP hatası! durum: ${response.status}`)
        }
        const data: Project[] = await response.json()
        setProjects(data)
      } catch (e: any) {
        setError(e.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p className="text-neon-blue text-xl">Projeler yükleniyor...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center">
        <p className="text-destructive text-xl">Hata: {error}</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-20 py-16 container mx-auto px-4">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-4xl md:text-5xl font-bold text-neon-green drop-shadow-md text-center mb-12"
        >
          Tüm Projelerimiz
        </motion.h1>

        {projects.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-xl mb-4">Henüz görüntülenecek herkese açık proje yok.</p>
            <Link href="/contact">
              <Button className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-neon-green to-neon-purple text-white rounded-full shadow-lg hover:shadow-neon-purple/50 transition-all duration-300 transform hover:scale-105">
                Kendi Projenizi Başlatın!
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <PublicProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <Link href="/services">
            <Button className="px-10 py-5 text-xl font-semibold bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-full shadow-lg hover:shadow-neon-blue/50 transition-all duration-300 transform hover:scale-105">
              Daha Fazla Keşfet
            </Button>
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  )
}
