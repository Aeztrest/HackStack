"use client"
import { useEffect, useRef } from "react"

export default function ParallaxBackground() {
  const ref1 = useRef<HTMLDivElement>(null)
  const ref2 = useRef<HTMLDivElement>(null)
  const ref3 = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY
      if (ref1.current) ref1.current.style.transform = `translateY(${y * 0.18}px)`
      if (ref2.current) ref2.current.style.transform = `translateY(${y * 0.12}px)`
      if (ref3.current) ref3.current.style.transform = `translateY(${y * 0.09}px)`
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 w-full h-full overflow-hidden" aria-hidden>
      <div ref={ref1} className="parallax-blob blob1" />
      <div ref={ref2} className="parallax-blob blob2" />
      <div ref={ref3} className="parallax-blob blob3" />
      <style jsx global>{`
        .parallax-blob {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.55;
          mix-blend-mode: lighten;
          z-index: -1;
        }
        .blob1 {
          width: 600px;
          height: 600px;
          left: -180px;
          top: -120px;
          background: radial-gradient(circle at 40% 60%, #00f0ff 0%, #007cf0 100%);
          animation: blob1move 12s ease-in-out infinite;
        }
        .blob2 {
          width: 500px;
          height: 500px;
          right: -150px;
          top: 200px;
          background: radial-gradient(circle at 60% 40%, #8a2be2 0%, #6d28d9 100%);
          animation: blob2move 14s ease-in-out infinite;
        }
        .blob3 {
          width: 400px;
          height: 400px;
          left: 40vw;
          bottom: -120px;
          background: radial-gradient(circle at 60% 40%, #00ff80 0%, #00c776 100%);
          animation: blob3move 16s ease-in-out infinite;
        }
        @keyframes blob1move {
          0%, 100% { transform: scale(1) translateY(0); }
          50% { transform: scale(1.08) translateY(40px); }
        }
        @keyframes blob2move {
          0%, 100% { transform: scale(1) translateY(0); }
          50% { transform: scale(0.95) translateY(-35px); }
        }
        @keyframes blob3move {
          0%, 100% { transform: scale(1) translateY(0); }
          50% { transform: scale(1.12) translateY(30px); }
        }
      `}</style>
    </div>
  )
}