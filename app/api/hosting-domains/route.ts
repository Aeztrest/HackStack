import { NextResponse } from "next/server"

const hostingDomainsData = {
  domains: [
    {
      id: "dom-1",
      name: "hackstack.com.tr",
      registrationDate: "2023-01-01T00:00:00Z",
      expirationDate: "2025-01-01T00:00:00Z",
      status: "Aktif",
    },
    {
      id: "dom-2",
      name: "myproject.dev",
      registrationDate: "2024-03-10T00:00:00Z",
      expirationDate: "2024-12-31T00:00:00Z",
      status: "Aktif",
    },
    {
      id: "dom-3",
      name: "old-site.net",
      registrationDate: "2022-05-20T00:00:00Z",
      expirationDate: "2024-08-15T00:00:00Z", // Süresi yakında dolacak
      status: "Aktif",
    },
    {
      id: "dom-4",
      name: "expired-domain.com",
      registrationDate: "2021-01-01T00:00:00Z",
      expirationDate: "2024-07-01T00:00:00Z", // Süresi doldu
      status: "Süresi Doldu",
    },
  ],
  hosting: {
    id: "host-1",
    planType: "Premium Pro",
    diskUsageGB: 45.7,
    totalDiskGB: 100,
    expirationDate: "2025-03-15T00:00:00Z",
    status: "Aktif",
    controlPanelLink: "https://panel.hackstackhosting.com",
  },
}

export async function GET() {
  return NextResponse.json(hostingDomainsData)
}
