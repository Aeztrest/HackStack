  "use client"

  import { useEffect, useRef } from "react"
  import { motion, useScroll, useTransform } from "framer-motion"
  import Hyperspeed from "@/components/Hyperspeed/Hyperspeed"

  export default function ParallaxBG() {
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

    }, [])

    return (
      <div
        ref={containerRef}
        className="pointer-events-none fixed inset-0 -z+10 w-full h-full overflow-hidden"
        aria-hidden
      >
        <Hyperspeed />
      </div>
    )
  }
