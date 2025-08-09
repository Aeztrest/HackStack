import { NextResponse } from "next/server"

const API_URL = "http://hackstack.com.tr:8000/projects"

export async function GET(request: Request) {
  try {
    // Client'tan gelen Authorization header'ı alıyoruz
    const token = request.headers.get("authorization")

    console.log(token)

    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: token || "",
      },
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    console.log("Fetched projects:", data) // Debugging için konsola yazdırıyoruz
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    )
  }
}
