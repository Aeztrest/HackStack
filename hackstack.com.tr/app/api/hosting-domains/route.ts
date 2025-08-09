// app/api/hosting-domains/route.ts
import { NextResponse } from "next/server"
import { headers } from "next/headers"

const API_BASE = "http://hackstack.com.tr:8000"

const toISO = (d?: string) => (d ? new Date(d).toISOString() : null)

const mapStatus = (s?: string) => {
  const v = (s || "").toLowerCase()
  if (v === "aktif") return "Aktif"
  if (v.includes("dolmak")) return "Dolmak Üzere"
  if (v.includes("süresi") || v.includes("doldu")) return "Süresi Doldu"
  return s || "Aktif"
}

const normalizeDomainName = (name: string) =>
  name.replace(/^https?:\/\//i, "").replace(/^www\./i, "")

const inferPlanType = (allocatedDisk?: number) => {
  if (!allocatedDisk && allocatedDisk !== 0) return "Custom"
  if (allocatedDisk >= 200) return "Premium Pro"
  if (allocatedDisk >= 100) return "Premium"
  if (allocatedDisk >= 50) return "Standard"
  return "Basic"
}

export async function GET(request: Request) {
  try {
    // Token'ı client'tan gelen Authorization header'ından bekliyoruz.
    // (Client tarafında localStorage'dan okuyup bu route'a ileteceksin.)
    const incomingAuth = request.headers.get("authorization")
    if (!incomingAuth) {
      return NextResponse.json({ error: "Token bulunamadı" }, { status: 401 })
    }

    const fetchOpts: RequestInit = {
      method: "GET",
      headers: { Authorization: incomingAuth },
      cache: "no-store",
    }

    const [domainsRes, hostingsRes] = await Promise.all([
      fetch(`${API_BASE}/domains`, fetchOpts),
      fetch(`${API_BASE}/hostings`, fetchOpts),
    ])

    if (!domainsRes.ok) {
      const txt = await domainsRes.text()
      throw new Error(`Domains API error: ${domainsRes.status} ${txt}`)
    }
    if (!hostingsRes.ok) {
      const txt = await hostingsRes.text()
      throw new Error(`Hostings API error: ${hostingsRes.status} ${txt}`)
    }

    // ---- Domains map ----
    const domainsData: Array<{
      id: string
      user_id: number
      name: string
      registrationDate: string
      expirationDate: string
      status: string
    }> = await domainsRes.json()

    const domains = domainsData.map(d => ({
      id: d.id,
      name: normalizeDomainName(d.name),
      registrationDate: toISO(d.registrationDate),
      expirationDate: toISO(d.expirationDate),
      status: mapStatus(d.status),
    }))

    // ---- Hosting map ----
    const hostingsData: Array<{
      id: string
      user_id: number
      name: string
      created_date: string
      expiration_date: string
      allocated_disk: number
      linked_domain: string | null
      status: string
      disk_usage_gb?: number
    }> = await hostingsRes.json()

    // UI tek obje bekliyor → ilk kaydı kullanıyoruz
    const h = hostingsData[0]
    const hosting = h
      ? {
          id: h.id,
          name: h.name,
          totalDiskGB: h.allocated_disk,
          registrationDate: toISO(h.created_date),
          expirationDate: toISO(h.expiration_date),
          status: mapStatus(h.status),
          controlPanelLink:
            process.env.NEXT_PUBLIC_CONTROL_PANEL_URL ??
            "https://panel.hackstackhosting.com",
        }
      : null

    return NextResponse.json({ domains, hosting })
  } catch (err: any) {
    return NextResponse.json(
      { error: err?.message || "Beklenmeyen hata" },
      { status: 500 }
    )
  }
}
