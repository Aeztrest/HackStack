"use client"

import Link from "next/link"
import { Code, ShieldCheck, Mail, Phone, MessageSquare } from "lucide-react"
import { useState } from "react" // isLoggedIn durumunu simüle etmek için

export function Footer() {
  // Oturum açma durumunu simüle ediyoruz. Gerçek bir uygulamada bu bir auth bağlamından gelirdi.
  const [isLoggedIn, setIsLoggedIn] = useState(true) // true olarak ayarlandı, böylece "Taleplerim" görünür

  return (
    <footer className="relative bg-background py-12 border-t border-white/10 overflow-hidden">
      {/* Parlayan Izgara Arka Plan */}
      <div className="absolute inset-0 pointer-events-none opacity-10 animate-grid-fade">
        <div className="absolute inset-0 bg-[size:40px_40px] bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-start">
            <Link href="/" className="flex items-center gap-2 text-3xl font-bold text-neon-blue drop-shadow-lg mb-4">
              <Code className="w-7 h-7 text-neon-green" />
              Hackstack
              <ShieldCheck className="w-7 h-7 text-neon-purple" />
            </Link>
            <p className="text-muted-foreground text-sm max-w-xs">
              Hack Smarter. Build Faster. Geleceğin dijital çözümlerini bugün inşa ediyoruz.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-neon-green mb-4">Hızlı Bağlantılar</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-neon-blue transition-colors">
                  Anasayfa
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-muted-foreground hover:text-neon-blue transition-colors">
                  Hizmetlerimiz
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-neon-blue transition-colors">
                  İletişim
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-muted-foreground hover:text-neon-blue transition-colors">
                  Projelerimiz
                </Link>
              </li>
              <li>
                {isLoggedIn ? (
                  <Link href="/dashboard" className="text-neon-green hover:text-neon-green/80 transition-colors">
                    Taleplerim
                  </Link>
                ) : (
                  <Link href="/auth" className="text-muted-foreground hover:text-neon-blue transition-colors">
                    Giriş Yap / Kayıt Ol
                  </Link>
                )}
              </li>
              <li>
                <Link href="#" className="text-muted-foreground hover:text-neon-blue transition-colors">
                  Gizlilik Politikası
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-neon-purple mb-4">Bize Ulaşın</h3>
            <ul className="space-y-2">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-5 h-5 text-neon-blue" />
                iletisim@hackstack.com.tr
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-5 h-5 text-neon-blue" />
                +90 535 226 02 45
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 text-center text-muted-foreground text-sm border-t border-white/5 pt-8">
          &copy; {new Date().getFullYear()} Hackstack. Tüm Hakları Saklıdır.
        </div>
      </div>
    </footer>
  )
}
