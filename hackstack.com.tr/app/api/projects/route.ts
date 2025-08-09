import { NextResponse } from "next/server"

// Bu, veritabanı yerine geçici olarak kullanılan sahte bir veri deposudur.
// Gerçek bir uygulamada, veriler bir veritabanından çekilir veya oraya kaydedilir.
const projects = [
  {
    id: "proj-1",
    name: "Hackstack Pazarlama Sitesi",
    description: "Hackstack için interaktif öğeler ve modern tasarıma sahip son teknoloji pazarlama web sitesi.",
    createdAt: "2023-10-26T10:00:00Z",
    updatesCount: 15,
    link: "https://hackstack.com.tr/",
  },
  {
    id: "proj-2",
    name: "Dahili CRM Sistemi",
    description: "Müşteri etkileşimlerini, satış süreçlerini ve destek taleplerini yönetmek için özel CRM çözümü.",
    createdAt: "2024-01-15T14:30:00Z",
    updatesCount: 8,
    link: "https://hackstack.com.tr/",
  },
  {
    id: "proj-3",
    name: "Güvenli Dosya Paylaşım Platformu",
    description: "Devlet müşterileri için güvenli belge paylaşımı ve işbirliği için uçtan uca şifreli platform.",
    createdAt: "2024-03-01T09:00:00Z",
    updatesCount: 22,
    link: "https://hackstack.com.tr/",
  },
  {
    id: "proj-4",
    name: "Yapay Zeka Destekli Tehdit İstihbaratı",
    description: "Gerçek zamanlı siber güvenlik tehdit tespiti ve analizi için makine öğrenimi destekli sistem.",
    createdAt: "2024-05-20T11:45:00Z",
    updatesCount: 5,
    link: "https://hackstack.com.tr/",
  },
  {
    id: "proj-5",
    name: "Blockchain Tedarik Zinciri Takipçisi",
    description: "Tedarik zinciri lojistiğinin şeffaf ve değişmez takibi için merkeziyetsiz uygulama.",
    createdAt: "2024-07-01T16:00:00Z",
    updatesCount: 10,
    link: "https://hackstack.com.tr/",
  },
  {
    id: "proj-6",
    name: "DevOps Otomasyon Hattı",
    description: "Daha hızlı ve daha güvenilir yazılım dağıtımları için otomatikleştirilmiş CI/CD hattı uygulaması.",
    createdAt: "2023-11-10T08:00:00Z",
    updatesCount: 18,
    link: "https://hackstack.com.tr/",
  },
]

export async function GET() {
  return NextResponse.json(projects)
}

export async function POST(request: Request) {
  const newProjectData = await request.json()
  // Gerçek bir uygulamada, bu veritabanına kaydedilir ve gerçek bir kimlik atanır.
  const id = `proj-${projects.length + 1}`
  const createdAt = new Date().toISOString()
  const projectWithId = { ...newProjectData, id, createdAt, updatesCount: 0, completionStatus: "Yeni" } // Yeni projeler için varsayılan durum
  projects.push(projectWithId) // Sahte amaçlar için
  return NextResponse.json(projectWithId, { status: 201 })
}
