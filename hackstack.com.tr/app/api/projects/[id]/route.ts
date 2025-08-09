import { NextResponse } from "next/server"

// Bu, veritabanı yerine geçici olarak kullanılan sahte bir veri deposudur.
const projects = [
  {
    id: "proj-1",
    name: "Hackstack Pazarlama Sitesi",
    description: "Hackstack için interaktif öğeler ve modern tasarıma sahip son teknoloji pazarlama web sitesi.",
    createdAt: "2023-10-26T10:00:00Z",
    updatesCount: 15,
    completionStatus: "Tamamlandı",
  },
  {
    id: "proj-2",
    name: "Dahili CRM Sistemi",
    description: "Müşteri etkileşimlerini, satış süreçlerini ve destek taleplerini yönetmek için özel CRM çözümü.",
    createdAt: "2024-01-15T14:30:00Z",
    updatesCount: 8,
    completionStatus: "Devam Ediyor",
  },
  {
    id: "proj-3",
    name: "Güvenli Dosya Paylaşım Platformu",
    description: "Devlet müşterileri için güvenli belge paylaşımı ve işbirliği için uçtan uca şifreli platform.",
    createdAt: "2024-03-01T09:00:00Z",
    updatesCount: 22,
    completionStatus: "Tamamlandı",
  },
  {
    id: "proj-4",
    name: "Yapay Zeka Destekli Tehdit İstihbaratı",
    description: "Gerçek zamanlı siber güvenlik tehdit tespiti ve analizi için makine öğrenimi destekli sistem.",
    createdAt: "2024-05-20T11:45:00Z",
    updatesCount: 5,
    completionStatus: "Devam Ediyor",
  },
  {
    id: "proj-5",
    name: "Blockchain Tedarik Zinciri Takipçisi",
    description: "Tedarik zinciri lojistiğinin şeffaf ve değişmez takibi için merkeziyetsiz uygulama.",
    createdAt: "2024-07-01T16:00:00Z",
    updatesCount: 10,
    completionStatus: "Tamamlandı",
  },
  {
    id: "proj-6",
    name: "DevOps Otomasyon Hattı",
    description: "Daha hızlı ve daha güvenilir yazılım dağıtımları için otomatikleştirilmiş CI/CD hattı uygulaması.",
    createdAt: "2023-11-10T08:00:00Z",
    updatesCount: 18,
    completionStatus: "Tamamlandı",
  },
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const { id } = params
  const project = projects.find((p) => p.id === id)

  if (project) {
    return NextResponse.json(project)
  } else {
    return NextResponse.json({ message: "Proje bulunamadı" }, { status: 404 })
  }
}
