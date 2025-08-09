import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json()

    if (!email || !password) {
      return NextResponse.json(
        { success: false, message: "E-posta ve şifre gereklidir." },
        { status: 400 }
      )
    }

    const fastApiUrl = `http://hackstack.com.tr:8000/users/login`

    const formBody = new URLSearchParams()
    formBody.append("email", email)
    formBody.append("password", password)

    const response = await fetch(fastApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody.toString(),
    })

    const data = await response.json()

    if (response.ok && data.access_token) {
      //localStorage.setItem("token", data.access_token)
      return NextResponse.json({
        success: true,
        message: "Giriş başarılı!",
        token: data.access_token,
        user: data.user, // Kullanıcı bilgilerini de döndürüyoruz
      })
    } else {
      return NextResponse.json(
        { success: false, message: data.detail || "Giriş başarısız." },
        { status: 401 }
      )
    }
  } catch (error) {
    console.error("Login API error:", error)
    return NextResponse.json(
      { success: false, message: "Sunucu hatası oluştu." },
      { status: 500 }
    )
  }
}
