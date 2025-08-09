// app/api/my-requests/[id]/route.ts
import { NextResponse } from "next/server"
import { headers } from "next/headers"

const API_BASE = "http://hackstack.com.tr:8000"

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const reqHeaders = await headers()
    const incomingAuth = reqHeaders.get("authorization")
    if (!incomingAuth) {
      return NextResponse.json({ error: "Token bulunamadı" }, { status: 401 })
    }

    const backendRes = await fetch(
      `${API_BASE}/projects/${encodeURIComponent(id)}`,
      {
        method: "GET",
        headers: { Authorization: incomingAuth },
        cache: "no-store",
      }
    )

    const bodyText = await backendRes.text()

    // Backend JSON döndürüyorsa JSON olarak ilet, aksi halde düz metinle ve aynı status ile dön
    if (!backendRes.ok) {
      // backend hata mesajını aynen geçir
      try {
        return NextResponse.json(JSON.parse(bodyText), { status: backendRes.status })
      } catch {
        return new NextResponse(bodyText || "İstek başarısız", { status: backendRes.status })
      }
    }

    // Başarılı — beklenen proje yapısını JSON olarak döndür
    return NextResponse.json(JSON.parse(bodyText))
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Beklenmeyen hata" },
      { status: 500 }
    )
  }
}
