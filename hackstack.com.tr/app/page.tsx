"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import ParallaxBG from "@/components/ParallaxBG"
import ClickSpark from "@/components/ClickSpark"
import StarBorder from "@/components/StarBorder/StarBorder"
import {
  ArrowRight,
  Code,
  Palette,
  Server,
  Type,
  Atom,
  Figma,
  ShoppingBag,
  Zap,
  Container,
  Database,
  ShieldCheck,
  Brain,
  Gem,
  Cloud,
} from "lucide-react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

export default function HomePage() {
  const technologies = [
    { name: "Python", icon: Server },
    { name: "TypeScript", icon: Type },
    { name: "Node.js", icon: Code },
    { name: "React.js", icon: Atom },
    { name: "Figma", icon: Figma },
    { name: "Shopify", icon: ShoppingBag },
    { name: "Next.js", icon: Zap },
    { name: "Tailwind CSS", icon: Palette },
    { name: "Docker", icon: Container },
    { name: "MongoDB", icon: Database },
  ]

  const projectWorks = [
    {
      name: "SalesEngine",
      tagline: "E-ticaret otomasyon platformu",
      image: "/salesengine-mockup.png",
      tags: ["#E-ticaret", "#Otomasyon", "#Web"],
    },
    {
      name: "TechFlex",
      tagline: "Yapay zeka destekli akıllı dashboard",
      image: "/techflex-mockup.png",
      tags: ["#AI", "#Dashboard", "#VeriAnalizi"],
    },
    {
      name: "SmartWater",
      tagline: "IoT entegreli su yönetim sistemi",
      image: "/smartwater-mockup.png",
      tags: ["#IoT", "#Mobil", "#AkıllıŞehir"],
    },
    {
      name: "ChainTrack",
      tagline: "Blockchain tabanlı tedarik zinciri çözümü",
      image: "/chaintrack-mockup.png",
      tags: ["#Blockchain", "#TedarikZinciri", "#Web3"],
    },
    {
      name: "CyberGuard",
      tagline: "Siber güvenlik eğitim simülatörü",
      image: "/cyberguard-mockup.png",
      tags: ["#SiberGüvenlik", "#Eğitim", "#Simülasyon"],
    },
    {
      name: "CloudFlow",
      tagline: "Bulut tabanlı DevOps otomasyonu",
      image: "/cloudflow-mockup.png",
      tags: ["#DevOps", "#Bulut", "#Otomasyon"],
    },
  ]

  const featuredServices = [
    {
      icon: Code,
      title: "Özel Web & Mobil Uygulamalar",
      description: "İşletmenize özel, ölçeklenebilir ve yüksek performanslı web ve mobil uygulamalar geliştiriyoruz.",
      color: "text-neon-blue",
    },
    {
      icon: ShieldCheck,
      title: "Siber Güvenlik Danışmanlığı",
      description: "Sistemlerinizi siber tehditlere karşı güçlendiriyor, zafiyetleri tespit edip gideriyoruz.",
      color: "text-neon-green",
    },
    {
      icon: Brain,
      title: "Yapay Zeka Destekli Araçlar",
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

  return (
    <div className="min-h-screen bg-background text-foreground">
      <ParallaxBG/>
      <ClickSpark>

      <Header />
      <main className="pt-20">
        {/* Hero Bölümü */}
        <section className="relative h-[92vh] flex items-center justify-center text-center overflow-hidden">
          <div className="relative z-10 px-4">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-green to-neon-purple drop-shadow-lg"
            >
              Hack Smarter. Build Faster.
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="mt-4 text-lg md:text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto"
            >
              Geleceğin dijital çözümlerini bugün inşa ediyoruz. Yenilikçi yazılım geliştirme hizmetleriyle işinizi büyütün.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="mt-8"
            >
              <Link href="/contact">
                <Button className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-full shadow-lg hover:shadow-neon-blue/50 transition-all duration-300 transform hover:scale-105">
                  Birlikte İnşa Edelim <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </motion.div>
          </div>
        </section>
        
        {/* Yaptığımız Projeler Bölümü (Yeni Konum) */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto text-center mb-4">
              Yaptığımız işler bize güvenen markaların başarısına dönüşüyor.
            </p>
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-green to-neon-purple drop-shadow-md">
              Yaptığımız Projeler
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectWorks.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{
                    scale: 1.03,
                    boxShadow: `0 0 40px ${index % 2 === 0 ? "#00F0FF" : "#00FF80"}40`, // Neon mavi veya yeşil parıltı
                  }}
                  className="relative group overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg transition-all duration-300"
                >
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.name}
                    width={800}
                    height={500}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="p-6 relative z-10">
                    <h3 className="text-2xl font-bold text-neon-blue mb-2">{project.name}</h3>
                    <p className="text-muted-foreground text-sm mb-4">{project.tagline}</p>
                    {project.tags && (
                      <div className="flex flex-wrap gap-2">
                        {project.tags.map((tag, tagIndex) => (
                          <span
                            key={tagIndex}
                            className="px-3 py-1 text-xs font-medium rounded-full bg-white/10 text-muted-foreground border border-white/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-12">
              <Link href="/projects">
                <Button className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-full shadow-lg hover:shadow-neon-blue/50 transition-all duration-300 transform hover:scale-105">
                  Tüm Projelerimizi Gör <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Öne Çıkan Hizmetlerimiz Bölümü (Eski Öne Çıkan Projeler) */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-neon-green drop-shadow-md">
              Öne Çıkan Hizmetlerimiz
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredServices.map((service, index) => {
                const Icon = service.icon;

                return (
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
                      className="absolute inset-0 opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                      style={{
                        background: `radial-gradient(circle at center, ${service.color.replace("text-", "")} 0%, transparent 70%)`,
                      }}
                    ></div>
                    <div className="relative z-10 flex flex-col items-center text-center">
                      <Icon className={`w-16 h-16 mb-6 ${service.color} drop-shadow-lg`} />
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
                );
              })}

            </div>
            <div className="text-center mt-12">
              <Link href="/services">
                <Button className="px-8 py-4 text-lg font-semibold bg-gradient-to-r from-neon-green to-neon-purple text-white rounded-full shadow-lg hover:shadow-neon-purple/50 transition-all duration-300 transform hover:scale-105">
                  Tüm Hizmetlerimiz <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Referanslar Bölümü */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-neon-purple drop-shadow-md">
              Müşterilerimiz Ne Diyor?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  quote:
                    "Hackstack ekibi, projemizi hayata geçirmede inanılmaz bir iş çıkardı. Hızları ve kaliteleri takdire şayan!",
                  author: "Ayşe Yılmaz",
                  title: "Startup Kurucusu",
                },
                {
                  quote:
                    "Siber güvenlik çözümleri sayesinde işimiz artık çok daha güvende. Hackstack'in uzmanlığı paha biçilemez.",
                  author: "Mehmet Demir",
                  title: "Kurumsal CEO",
                },
                {
                  quote: "Karmaşık backend ihtiyaçlarımızı kusursuzca karşıladılar. Gerçekten alanlarında en iyiler!",
                  author: "Zeynep Kaya",
                  title: "Teknoloji Direktörü",
                },
                {
                  quote:
                    "Dijital dönüşüm sürecimizde bize yol gösterdiler ve beklentilerimizin ötesinde sonuçlar elde ettik.",
                  author: "Can Polat",
                  title: "Devlet Projesi Yöneticisi",
                },
                {
                  quote: "UX/UI tasarımları harika! Kullanıcılarımız yeni arayüzü çok sevdi. İşbirliği harikaydı.",
                  author: "Elif Aksoy",
                  title: "Ürün Müdürü",
                },
                {
                  quote:
                    "DevOps süreçlerimizi otomatikleştirdiler ve dağıtım sürelerimiz rekor seviyede kısaldı. Teşekkürler Hackstack!",
                  author: "Burak Can",
                  title: "Baş Mühendis",
                },
              ].map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{
                    boxShadow: `0 0 30px ${index % 3 === 0 ? "#00F0FF" : index % 3 === 1 ? "#00FF80" : "#8A2BE2"}60`, // Hafif parlama efekti
                  }}
                  className="relative p-6 rounded-xl border border-neon-blue/20 bg-white/5 backdrop-blur-sm shadow-lg transition-all duration-300" // animate-glow-pulse kaldırıldı
                >
                  <p className="text-lg text-muted-foreground italic mb-4">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-4">
                    <Image
                      src={`/generic-avatar.png?height=64&width=64&query=avatar%20of%20${testimonial.author}`}
                      alt={testimonial.author}
                      width={64}
                      height={64}
                      className="rounded-full border-2 border-neon-green"
                    />
                    <div>
                      <p className="font-bold text-neon-green">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Kullandığımız Teknolojiler Bölümü */}
        <section className="py-20 bg-secondary border-t border-white/10">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-green to-neon-purple drop-shadow-lg">
              Kullandığımız Teknolojiler
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
              {technologies.map((tech, index) => {
                const Icon = tech.icon;

                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(0, 240, 255, 0.4)" }}
                    className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl p-4 text-center flex flex-col items-center justify-center shadow-lg transition-all duration-300"
                  >
                    {Icon && typeof Icon === "function" && (
                      <Icon className="w-12 h-12 text-neon-blue mb-3 drop-shadow-md" />
                    )}
                    <p className="text-lg font-semibold text-foreground">{tech.name}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
        {/* Harekete Geçirme Bölümü */}
        <section className="py-20 bg-background">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neon-green to-neon-purple drop-shadow-md mb-6">
              Fikrinizi Gerçeğe Dönüştürelim.
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Bir sonraki büyük projeniz için hazır mısınız? Hackstack ile potansiyelinizi açığa çıkarın.
            </p>
            <Link href="/contact">
              <Button className="px-10 py-5 text-xl font-semibold bg-gradient-to-r from-neon-green to-neon-purple text-white rounded-full shadow-lg hover:shadow-neon-purple/50 transition-all duration-300 transform hover:scale-105">
                Bize Ulaşın <ArrowRight className="ml-3 w-6 h-6" />
              </Button>
            </Link>
          </div>
        </section>
      </main>
      </ClickSpark>
      <Footer />
    </div>
  )
}
