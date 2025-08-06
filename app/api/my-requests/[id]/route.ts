import { NextResponse } from "next/server"

// Sahte hizmet talepleri verisi (detaylar için)
const serviceRequests = [
  {
    id: "req-1",
    projectName: "E-ticaret Platformu Geliştirme",
    status: "Devam Ediyor",
    requestDate: "2024-07-10T10:00:00Z",
    details: "Mobil uyumlu, güvenli ödeme entegrasyonlu yeni nesil e-ticaret platformu.",
  },
  {
    id: "req-2",
    projectName: "Siber Güvenlik Denetimi",
    status: "Tamamlandı",
    requestDate: "2024-06-01T14:30:00Z",
    details: "Şirket ağının ve sunucularının kapsamlı güvenlik denetimi ve raporlaması.",
  },
  {
    id: "req-3",
    projectName: "Mobil Uygulama UX/UI Yenileme",
    status: "Beklemede",
    requestDate: "2024-07-25T09:00:00Z",
    details: "Mevcut mobil uygulamanın kullanıcı deneyimi ve arayüz tasarımının iyileştirilmesi.",
  },
  {
    id: "req-4",
    projectName: "Blockchain Tabanlı Kimlik Doğrulama",
    status: "Devam Ediyor",
    requestDate: "2024-07-05T11:45:00Z",
    details: "Merkeziyetsiz ve güvenli kimlik doğrulama sistemi entegrasyonu.",
  },
  {
    id: "req-5",
    projectName: "DevOps CI/CD Hattı Kurulumu",
    status: "Tamamlandı",
    requestDate: "2024-05-15T16:00:00Z",
    details: "Yazılım geliştirme süreçlerini otomatikleştirmek için CI/CD hattının kurulması.",
  },
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const requestDetail = serviceRequests.find((req) => req.id === id)

  if (requestDetail) {
    return NextResponse.json(requestDetail)
  } else {
    return NextResponse.json({ message: "Talep bulunamadı" }, { status: 404 })
  }
}
