import { NextResponse } from "next/server"

export async function POST(request: Request) {
  try {
    const { email, password, first_name, last_name, phone_number } = await request.json()

    if (!email || !password || password.length < 6) {
      return NextResponse.json(
        { success: false, message: "Geçersiz e-posta veya şifre (en az 6 karakter olmalı)." },
        { status: 400 }
      )
    }

    const fastApiUrl = `http://hackstack.com.tr:8000/users/register`

    const response = await fetch(fastApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        first_name,
        last_name,
        phone_number,
      }),
    })

    const data = await response.json()

    if (response.ok && data.user_id) {
      return NextResponse.json({
        success: true,
        message: "Kayıt başarılı! Şimdi giriş yapabilirsiniz.",
      })
    } else {
      return NextResponse.json(
        { success: false, message: data.detail || "Kayıt başarısız." },
        { status: 400 }
      )
    }
  } catch (error) {
    console.error("Register API error:", error)
    return NextResponse.json(
      { success: false, message: "Sunucu hatası oluştu." },
      { status: 500 }
    )
  }
}
