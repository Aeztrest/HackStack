"use client"

import type React from "react"
import { useState, useEffect } from "react" // isLoggedIn durumunu simüle etmek için
import Link from "next/link"
import { motion } from "framer-motion"
import { Code, ShieldCheck } from "lucide-react"

export function Header() {
  // Oturum açma durumunu simüle ediyoruz. Gerçek bir uygulamada bu bir auth bağlamından gelirdi.
  const [isLoggedIn, setIsLoggedIn] = useState(false) // true olarak ayarlandı, böylece "Taleplerim" görünür

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setIsLoggedIn(true)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/30 backdrop-blur-lg border-b border-white/10 shadow-lg"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-neon-blue drop-shadow-lg">
          <Code className="w-6 h-6 text-neon-green" />
          Hackstack
          <ShieldCheck className="w-6 h-6 text-neon-purple" />
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          <NavLink href="/">Anasayfa</NavLink>
          <NavLink href="/services">Hizmetlerimiz</NavLink>
          <NavLink href="/contact">İletişim</NavLink>
          <NavLink href="/projects">Projelerimiz</NavLink>
          {isLoggedIn ? (
            <NavLink href="/taleplerim" highlight>
              Taleplerim
            </NavLink>
          ) : (
            <NavLink href="/auth">Giriş Yap / Kayıt Ol</NavLink>
          )}
        </nav>
        {/* Mobil menü butonu buraya gelebilir */}
      </div>
    </motion.header>
  )
}

function NavLink({ href, children, highlight }: { href: string; children: React.ReactNode; highlight?: boolean }) {
  return (
    <Link
      href={href}
      className={`text-lg font-medium transition-colors duration-300 relative group ${
        highlight ? "text-neon-green hover:text-neon-green/80" : "text-foreground hover:text-neon-blue"
      }`}
    >
      {children}
      <span
        className={`absolute bottom-0 left-0 w-0 h-0.5 ${
          highlight ? "bg-neon-green" : "bg-neon-blue"
        } group-hover:w-full transition-all duration-300`}
      ></span>
    </Link>
  )
}
