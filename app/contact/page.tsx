"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MessageSquare, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pt-20 py-16">
        <section className="container mx-auto px-4 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl md:text-6xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-green to-neon-purple drop-shadow-lg mb-8"
          >
            Bize Ulaşın
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12"
          >
            Fikrinizi gerçeğe dönüştürmek için sabırsızlanıyoruz. Projeniz hakkında konuşmak için bizimle iletişime
            geçin.
          </motion.p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Sol Taraf: Şirket Bilgileri */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="p-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg text-left relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-10 animate-grid-fade">
                <div className="absolute inset-0 bg-[size:40px_40px] bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)]"></div>
              </div>
              <div className="relative z-10">
                <h2 className="text-3xl font-bold text-neon-green mb-6">İletişim Bilgileri</h2>
                <ul className="space-y-6 text-lg">
                  <li className="flex items-center gap-4">
                    <Mail className="w-8 h-8 text-neon-blue" />
                    <Link
                      href="mailto:contact@hackstack.com.tr"
                      className="text-muted-foreground hover:text-neon-blue transition-colors"
                    >
                      iletisim@hackstack.com.tr
                    </Link>
                  </li>
                  <li className="flex items-center gap-4">
                    <Phone className="w-8 h-8 text-neon-purple" />
                    <Link
                      href="tel:+905551234567"
                      className="text-muted-foreground hover:text-neon-purple transition-colors"
                    >
                      +90 535 226 02 45
                    </Link>
                  </li>
                  <li className="flex items-center gap-4">
                    <MapPin className="w-8 h-8 text-neon-blue" />
                    <span className="text-muted-foreground">
                      Yenibosna, İstanbul, Türkiye
                    </span>
                  </li>
                </ul>
                {/* İsteğe Bağlı: Gömülü harita yer tutucusu */}
                <div className="mt-8 w-full h-64 rounded-lg overflow-hidden border border-white/10 shadow-inner">
                  <Image
                    src="/placeholder.svg?height=256&width=512"
                    alt="Harita Konumu"
                    width={512}
                    height={256}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </motion.div>

            {/* Sağ Taraf: İletişim Formu */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
              className="p-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg relative overflow-hidden"
            >
              <div className="absolute inset-0 opacity-10 animate-grid-fade">
                <div className="absolute inset-0 bg-[size:40px_40px] bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)]"></div>
              </div>
              <form className="relative z-10 space-y-6">
                <h2 className="text-3xl font-bold text-neon-purple mb-6">Mesaj Gönderin</h2>
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-2">
                    Adınız
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Adınız Soyadınız"
                    className="bg-transparent border border-neon-blue/50 focus:border-neon-blue text-foreground placeholder:text-muted-foreground focus:ring-neon-blue/50 transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                    E-posta Adresiniz
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    className="bg-transparent border border-neon-green/50 focus:border-neon-green text-foreground placeholder:text-muted-foreground focus:ring-neon-green/50 transition-all duration-300"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-2">
                    Mesajınız
                  </label>
                  <Textarea
                    id="message"
                    placeholder="Projeniz hakkında detayları buraya yazın..."
                    rows={5}
                    className="bg-transparent border border-neon-purple/50 focus:border-neon-purple text-foreground placeholder:text-muted-foreground focus:ring-neon-purple/50 transition-all duration-300"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full px-8 py-4 text-lg font-semibold bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-full shadow-lg hover:shadow-neon-blue/50 transition-all duration-300 transform hover:scale-105"
                >
                  Mesajı Gönder
                </Button>
              </form>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
            className="mt-16 text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-purple drop-shadow-md mb-6">
              Fikrinizi Gerçeğe Dönüştürelim.
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Hackstack ile potansiyelinizi açığa çıkarın.
            </p>
            <Link href="/contact">
              <Button className="px-10 py-5 text-xl font-semibold bg-gradient-to-r from-neon-green to-neon-purple text-white rounded-full shadow-lg hover:shadow-neon-purple/50 transition-all duration-300 transform hover:scale-105">
                Hemen Başlayın!
              </Button>
            </Link>
          </motion.div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
