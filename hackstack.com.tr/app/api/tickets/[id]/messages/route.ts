import { NextResponse, type NextRequest } from "next/server"

type Attachment = {
  id: string
  name: string
  type: string
  size: number
  url: string // data URL (demo)
}

type Message = {
  id: string
  ticketId: string
  author: "user" | "support"
  text: string
  attachments?: Attachment[]
  createdAt: string
}

// In-memory message store for demo purposes
const store = globalThis as unknown as {
  __TICKET_MESSAGES__?: Record<string, Message[]>
}

if (!store.__TICKET_MESSAGES__) {
  store.__TICKET_MESSAGES__ = {}
}

function ensureSeed(ticketId: string) {
  const map = store.__TICKET_MESSAGES__!
  if (!map[ticketId]) {
    map[ticketId] = [
      {
        id: crypto.randomUUID(),
        ticketId,
        author: "support",
        text: "Merhaba! Bu alanda isteklerinizi ticket mantığında iletebilir ve görsel örnekler ekleyebilirsiniz. Nasıl yardımcı olabiliriz?",
        createdAt: new Date().toISOString(),
      },
    ]
  }
}

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  const ticketId = params.id
  ensureSeed(ticketId)
  return NextResponse.json(store.__TICKET_MESSAGES__![ticketId])
}

export async function POST(req: NextRequest, { params }: { params: { id: string } }) {
  const ticketId = params.id
  ensureSeed(ticketId)

  const { author, text, attachments } = await req.json()
  const msg: Message = {
    id: crypto.randomUUID(),
    ticketId,
    author: author === "support" ? "support" : "user",
    text: typeof text === "string" ? text : "",
    attachments: Array.isArray(attachments) ? attachments : [],
    createdAt: new Date().toISOString(),
  }
  store.__TICKET_MESSAGES__![ticketId].push(msg)
  return NextResponse.json(msg, { status: 201 })
}
