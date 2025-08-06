import { NextResponse } from "next/server"

// Sahte kullanıcı verisi
const currentUser = {
  id: "user-123",
  name: "Ali Can",
  email: "ali.can@example.com",
}

export async function GET() {
  // Gerçek bir uygulamada, bu istek kimlik doğrulama jetonuna göre kullanıcıyı döndürür.
  // Şimdilik, her zaman aynı sahte kullanıcıyı döndürüyoruz.
  return NextResponse.json(currentUser)
}
