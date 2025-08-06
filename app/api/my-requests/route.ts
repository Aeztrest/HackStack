/*import { NextResponse } from "next/server"

// Sahte hizmet talepleri verisi
const serviceRequests = [
  {
    id: "req-1",
    projectName: "E-ticaret Platformu Geliştirme",
    status: "Devam Ediyor",
    requestDate: "2024-07-10T10:00:00Z",
    startDate: "2024-07-15T00:00:00Z", // Yeni alan
    details: "Mobil uyumlu, güvenli ödeme entegrasyonlu yeni nesil e-ticaret platformu.",
  },
  {
    id: "req-2",
    projectName: "Siber Güvenlik Denetimi",
    status: "Tamamlandı",
    requestDate: "2024-06-01T14:30:00Z",
    startDate: "2024-06-05T00:00:00Z", // Yeni alan
    details: "Şirket ağının ve sunucularının kapsamlı güvenlik denetimi ve raporlaması.",
  },
  {
    id: "req-3",
    projectName: "Mobil Uygulama UX/UI Yenileme",
    status: "Beklemede",
    requestDate: "2024-07-25T09:00:00Z",
    startDate: null, // Yeni alan
    details: "Mevcut mobil uygulamanın kullanıcı deneyimi ve arayüz tasarımının iyileştirilmesi.",
  },
  {
    id: "req-4",
    projectName: "Blockchain Tabanlı Kimlik Doğrulama",
    status: "Devam Ediyor",
    requestDate: "2024-07-05T11:45:00Z",
    startDate: "2024-07-10T00:00:00Z", // Yeni alan
    details: "Merkeziyetsiz ve güvenli kimlik doğrulama sistemi entegrasyonu.",
  },
  {
    id: "req-5",
    projectName: "DevOps CI/CD Hattı Kurulumu",
    status: "Tamamlandı",
    requestDate: "2024-05-15T16:00:00Z",
    startDate: "2024-05-20T00:00:00Z", // Yeni alan
    details: "Yazılım geliştirme süreçlerini otomatikleştirmek için CI/CD hattının kurulması.",
  },
]

export async function GET() {
  // Gerçek bir uygulamada, bu istek kimlik doğrulama jetonuna göre kullanıcının taleplerini döndürür.
  // Şimdilik, her zaman aynı sahte talepleri döndürüyoruz.
  return NextResponse.json(serviceRequests)
}

*/

import { NextResponse } from "next/server"

const API_URL = "http://hackstack.com.tr:8000/projects"

export async function GET(request: Request) {
  try {
    // Client'tan gelen Authorization header'ı alıyoruz
    const token = request.headers.get("authorization")

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
