"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { motion } from "framer-motion"
import { Mail, Lock, User, Phone } from "lucide-react"

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [message, setMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    setIsSubmitting(true)

    const endpoint = isLogin ? "/api/login" : "/api/register"
    const method = "POST"

    const body = isLogin
      ? { email, password }
      : {
          email,
          password,
          first_name: firstName,
          last_name: lastName,
          phone_number: phoneNumber,
        }

    try {
      const response = await fetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      })

      const data = await response.json()

      if (response.ok && data.success) {
        setMessage(data.message)
        if (isLogin) {
          localStorage.setItem("token", data.token)
          console.log(localStorage.getItem("token"))
          console.log("Giriş başarılı, yönlendiriliyor...")
          router.push("/taleplerim")
        } else {
          setIsLogin(true)
          setEmail("")
          setPassword("")
          setFirstName("")
          setLastName("")
          setPhoneNumber("")
        }
      } else {
        setMessage(data.message || "Bir hata oluştu.")
      }
    } catch (error) {
      setMessage("Sunucuya bağlanırken bir hata oluştu.")
      console.error("Auth error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Header />
      <main className="flex-grow flex items-center justify-center pt-20 py-16 px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-md p-8 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm shadow-lg relative overflow-hidden"
        >
          <div className="absolute inset-0 pointer-events-none opacity-10 animate-grid-fade">
            <div className="absolute inset-0 bg-[size:40px_40px] bg-[radial-gradient(circle,rgba(255,255,255,0.05)_1px,transparent_1px)]"></div>
          </div>

          <div className="relative z-10">
            <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-neon-blue via-neon-green to-neon-purple drop-shadow-lg">
              {isLogin ? "Giriş Yap" : "Kayıt Ol"}
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
              {!isLogin && (
                <>
                  <div>
                    <Label htmlFor="first_name" className="block text-sm font-medium text-muted-foreground mb-2">
                      Ad
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neon-green" />
                      <Input
                        id="first_name"
                        type="text"
                        placeholder="Adınız"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                        className="pl-10 bg-transparent border border-neon-green/50 focus:border-neon-green text-foreground placeholder:text-muted-foreground focus:ring-neon-green/50 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="last_name" className="block text-sm font-medium text-muted-foreground mb-2">
                      Soyad
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neon-green" />
                      <Input
                        id="last_name"
                        type="text"
                        placeholder="Soyadınız"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                        className="pl-10 bg-transparent border border-neon-green/50 focus:border-neon-green text-foreground placeholder:text-muted-foreground focus:ring-neon-green/50 transition-all duration-300"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone_number" className="block text-sm font-medium text-muted-foreground mb-2">
                      Telefon Numarası
                    </Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neon-purple" />
                      <Input
                        id="phone_number"
                        type="tel"
                        placeholder="05xxxxxxxxx"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        className="pl-10 bg-transparent border border-neon-purple/50 focus:border-neon-purple text-foreground placeholder:text-muted-foreground focus:ring-neon-purple/50 transition-all duration-300"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <Label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-2">
                  E-posta Adresi
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neon-blue" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-10 bg-transparent border border-neon-blue/50 focus:border-neon-blue text-foreground placeholder:text-muted-foreground focus:ring-neon-blue/50 transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="password" className="block text-sm font-medium text-muted-foreground mb-2">
                  Şifre
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-neon-purple" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-10 bg-transparent border border-neon-purple/50 focus:border-neon-purple text-foreground placeholder:text-muted-foreground focus:ring-neon-purple/50 transition-all duration-300"
                  />
                </div>
              </div>

              {message && (
                <p
                  className={`text-center text-sm ${message.includes("başarılı") ? "text-neon-green" : "text-destructive"}`}
                >
                  {message}
                </p>
              )}

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-4 text-lg font-semibold bg-gradient-to-r from-neon-blue to-neon-purple text-white rounded-full shadow-lg hover:shadow-neon-blue/50 transition-all duration-300 transform hover:scale-105"
              >
                {isSubmitting
                  ? isLogin
                    ? "Giriş Yapılıyor..."
                    : "Kaydolunuyor..."
                  : isLogin
                    ? "Giriş Yap"
                    : "Kayıt Ol"}
              </Button>
            </form>

            <div className="mt-6 text-center text-muted-foreground">
              {isLogin ? (
                <>
                  Hesabınız yok mu?{" "}
                  <Button
                    variant="link"
                    onClick={() => setIsLogin(false)}
                    className="text-neon-green hover:text-neon-green/80 p-0 h-auto"
                  >
                    Kayıt Ol
                  </Button>
                </>
              ) : (
                <>
                  Zaten bir hesabınız var mı?{" "}
                  <Button
                    variant="link"
                    onClick={() => setIsLogin(true)}
                    className="text-neon-blue hover:text-neon-blue/80 p-0 h-auto"
                  >
                    Giriş Yap
                  </Button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
