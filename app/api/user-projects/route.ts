import { NextResponse } from "next/server"

const userProjectsData = [
  {
    id: "user-proj-1",
    name: "Hackstack Pazarlama Sitesi v2",
    assignedTeamMember: "Ayşe Yılmaz",
    estimatedDeliveryDate: "2024-09-30T00:00:00Z",
    status: "Geliştirme", // Tasarım, Geliştirme, Test, Yayında, Beklemede
    milestones: [
      { name: "Tasarım Onayı", status: "Tamamlandı" },
      { name: "Frontend Geliştirme", status: "Devam Ediyor" },
      { name: "Backend Entegrasyonu", status: "Beklemede" },
      { name: "Test ve Dağıtım", status: "Beklemede" },
    ],
  },
  {
    id: "user-proj-2",
    name: "Mobil Uygulama Güvenlik Güncellemesi",
    assignedTeamMember: "Mehmet Demir",
    estimatedDeliveryDate: "2024-08-20T00:00:00Z",
    status: "Test",
    milestones: [
      { name: "Zafiyet Analizi", status: "Tamamlandı" },
      { name: "Yama Geliştirme", status: "Tamamlandı" },
      { name: "Penetrasyon Testi", status: "Devam Ediyor" },
      { name: "Dağıtım", status: "Beklemede" },
    ],
  },
  {
    id: "user-proj-3",
    name: "Yeni CRM Modülü Entegrasyonu",
    assignedTeamMember: "Zeynep Kaya",
    estimatedDeliveryDate: "2024-10-15T00:00:00Z",
    status: "Beklemede",
    milestones: [
      { name: "Gereksinim Analizi", status: "Tamamlandı" },
      { name: "Tasarım", status: "Beklemede" },
      { name: "Geliştirme", status: "Beklemede" },
      { name: "Test ve Yayına Alma", status: "Beklemede" },
    ],
  },
]

export async function GET() {
  return NextResponse.json(userProjectsData)
}
