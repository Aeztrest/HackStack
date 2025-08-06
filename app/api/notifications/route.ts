import { NextResponse } from "next/server"

const notificationsData = [
  {
    id: "notif-1",
    type: "update", // update, deadline, maintenance, new-feature
    message: "E-ticaret Platformu Geliştirme projenizde yeni bir güncelleme var.",
    date: "2024-07-30T14:00:00Z",
    link: "/taleplerim/req-1",
  },
  {
    id: "notif-2",
    type: "deadline",
    message: "old-site.net alan adınızın süresi 15 gün içinde doluyor. Lütfen yenileyin.",
    date: "2024-07-28T10:00:00Z",
    link: "/taleplerim#hosting-domain",
  },
  {
    id: "notif-3",
    type: "maintenance",
    message: "Barındırma sunucularımızda planlı bakım çalışması: 15 Ağustos 02:00-04:00.",
    date: "2024-07-27T18:00:00Z",
    link: "#",
  },
  {
    id: "notif-4",
    type: "new-feature",
    message: "Yeni 'Performans Raporları' özelliği kontrol panelinize eklendi!",
    date: "2024-07-26T09:00:00Z",
    link: "#",
  },
  {
    id: "notif-5",
    type: "update",
    message: "Mobil Uygulama Güvenlik Güncellemesi projeniz test aşamasına geçti.",
    date: "2024-07-25T11:00:00Z",
    link: "/taleplerim/user-proj-2",
  },
]

export async function GET() {
  return NextResponse.json(notificationsData)
}
