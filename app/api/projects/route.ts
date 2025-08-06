import { NextResponse } from "next/server"

const API_URL = "http://hackstack.com.tr:8000/projects"

export async function GET() {
  try {
    const response = await fetch(API_URL, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Eğer JWT gerekiyorsa buraya ekle
        // "Authorization": `Bearer ${token}`,
      },
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const newProjectData = await request.json()

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Eğer JWT gerekiyorsa buraya ekle
        // "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify(newProjectData),
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`)
    }

    const data = await response.json()
    return NextResponse.json(data, { status: 201 })
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    )
  }
}
