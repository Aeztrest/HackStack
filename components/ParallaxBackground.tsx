"use client"

import { useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import dynamic from "next/dynamic"

// Dinamik importlar (SSR kapalı çünkü Three.js tarayıcıya özel çalışır)
const Model = dynamic(() => import("@/components/ThreeModel"), { ssr: false })
const VideoBackground = dynamic(() => import("@/components/VideoBackground"), { ssr: false })

export default function ParallaxBackground() {
  const { scrollY } = useScroll()

  // Scroll hareketine göre katmanların dikey pozisyonlarını belirle
  const y1 = useTransform(scrollY, [0, 600], ["0px", "-100px"])
  const y2 = useTransform(scrollY, [0, 600], ["0px", "-200px"])
  const y3 = useTransform(scrollY, [0, 600], ["0px", "-300px"])

  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window
      const x = (e.clientX / innerWidth - 0.5) * 2
      const y = (e.clientY / innerHeight - 0.5) * 2

      if (containerRef.current) {
        containerRef.current.style.transform = `translate(${x * 10}px, ${y * 10}px)`
      }

      // Derinliğe göre diğer katmanları kaydır
      document.querySelectorAll<HTMLElement>(".floating-model").forEach((el, i) => {
        const depth = (i + 1) * 10
        el.style.transform = `translate(${x * depth}px, ${y * depth}px)`
      })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <div
      ref={containerRef}
      className="pointer-events-none fixed inset-0 -z+10 w-full h-full overflow-hidden"
      aria-hidden
    >
      <VideoBackground />

      {/* Parallax 3D Model Katmanları */}
      <motion.div style={{ y: y1 }} className="floating-model absolute top-20 left-20 w-[300px] h-[300px]">
        <Model />
      </motion.div>
      <motion.div style={{ y: y2 }} className="floating-model absolute bottom-28 right-28 w-[350px] h-[350px]">
        <Model />
      </motion.div>
      <motion.div style={{ y: y3 }} className="floating-model absolute top-1/2 left-1/3 w-[250px] h-[250px]">
        <Model />
      </motion.div>
    </div>
  )
}
