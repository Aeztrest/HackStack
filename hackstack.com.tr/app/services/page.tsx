"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import {
  Code,
  ShieldCheck,
  Brain,
  Gem,
  Cloud,
  Palette,
  ArrowRight,
  QrCode,
  CalendarCheck,
  CreditCard,
  Database,
  Bot,
} from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"

export default function ServicesPage() {
  const services = [
    {
      icon: Code,
      title: "Özel Web & Mobil Uygulamalar",
      description: "İşletmenize özel, ölçeklenebilir ve yüksek performanslı web ve mobil uygulamalar geliştiriyoruz.",
      color: "text-neon-blue",
    },
    {
      icon: ShieldCheck,
      title: "Siber Güvenlik Danışmanlığı & Penetrasyon Testi",
      description: "Sistemlerinizi siber tehditlere karşı güçlendiriyor, zafiyetleri tespit edip gideriyoruz.",
      color: "text-neon-green",
    },
    {
      icon: Brain,
      title: "Yapay Zeka Destekli Araçlar & Otomasyon",
      description: "İş süreçlerinizi optimize eden, verimliliği artıran akıllı AI çözümleri ve otomasyonlar.",
      color: "text-neon-purple",
    },
    {
      icon: Gem,
      title: "Blockchain & Web3 Çözümleri",
      description: "Güvenli, şeffaf ve merkeziyetsiz uygulamalar için blockchain ve Web3 teknolojileri.",
      color: "text-neon-blue",
    },
    {
      icon: Cloud,
      title: "DevOps & Bulut Altyapısı",
      description: "Geliştirme ve dağıtım süreçlerinizi hızlandıran, güvenilir bulut tabanlı DevOps çözümleri.",
      color: "text-neon-green",
    },
    {
      icon: Palette,
      title: "UX/UI Tasarım & Prototipleme",
      description:
        "Kullanıcı odaklı, estetik ve işlevsel arayüz tasarımlarıyla dijital deneyimlerinizi iyileştiriyoruz.",
      color: "text-neon-purple",
    },
  ]

  const products = [
    {
      icon: QrCode,
      title: "QR Menü Sistemleri",
      description: "Cafe ve restoranlar için temassız, dijital menü çözümleri.",
      color: "text-neon-blue",
    },
    {
      icon: CalendarCheck,
      title: "Randevu & Rezervasyon Takip Paneli",
      description: "Berber, klinik, kurslar ve daha fazlası için akıllı randevu yönetimi.",
      color: "text-neon-green",
    },
    {
      icon: CreditCard,
      title: "NFC Kartvizit Sistemi",
      description: "Kişisel ve kurumsal kullanım için temassız dijital kartvizitler.",
      color: "text-neon-purple",
    },
    {
      icon: Database,
      title: "Web Scraping Hizmeti",
      description: "İhtiyacınız olan verileri otomatik olarak toplama ve analiz etme çözümleri.",
      color: "text-neon-blue",
    },
    {
      icon: Bot,
      title: "Otomasyon Bot Geliştirme",
      description: "Sosyal medya, sipariş veya veri girişi gibi işlemler için özel botlar.",
      color: "text-neon-green",
    },
  ]

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
            Hizmetlerimiz
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12"
          >
            Hackstack olarak, işinizin dijital geleceğini şekillendirmek için geniş bir yelpazede yenilikçi çözümler
            sunuyoruz.
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, boxShadow: `0 0 30px ${service.color.replace("text-", "")}30` }}
                className="relative group p-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg overflow-hidden"
              >
                <div
                  className={`absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
                  style={{
                    background: `radial-gradient(circle at center, ${service.color.replace("text-", "")} 0%, transparent 70%)`,
                  }}
                ></div>
                <div className="relative z-10 flex flex-col items-center text-center">
                  <service.icon className={`w-16 h-16 mb-6 ${service.color} drop-shadow-lg`} />
                  <h3 className="text-2xl font-bold text-neon-blue mb-3">{service.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6">{service.description}</p>
                  <Link href="/contact">
                    <Button
                      variant="ghost"
                      className={`text-white border border-current hover:bg-white/10 transition-colors ${service.color}`}
                    >
                      Teklif Al <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Ürünlerimiz Bölümü (Yeni) */}
        <section className="container mx-auto px-4 text-center py-20">
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-purple drop-shadow-md mb-12"
          >
            Ürünlerimiz
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.03, boxShadow: `0 0 30px ${product.color.replace("text-", "")}30` }}
                className="relative group p-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg overflow-hidden"
              >
                <div
                  className={`absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
                  style={{
                    background: `radial-gradient(circle at center, ${product.color.replace("text-", "")} 0%, transparent 70%)`,
                  }}
                ></div>
                <div className="relative z-10 flex flex-col items-center text-center">
                  <product.icon className={`w-16 h-16 mb-6 ${product.color} drop-shadow-lg`} />
                  <h3 className="text-2xl font-bold text-neon-blue mb-3">{product.title}</h3>
                  <p className="text-muted-foreground text-sm mb-6">{product.description}</p>
                  <Link href="/contact">
                    <Button
                      variant="ghost"
                      className={`text-white border border-current hover:bg-white/10 transition-colors ${product.color}`}
                    >
                      Teklif Al <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

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
      </main>
      <Footer />
    </div>
  )
}
