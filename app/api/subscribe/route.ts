import { NextRequest, NextResponse } from 'next/server'

const API_KEY = process.env.BEEHIIV_API_KEY!
const PUB_ID = process.env.BEEHIIV_PUBLICATION_ID!

export async function POST(request: NextRequest) {
  const { email } = await request.json()
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

  const res = await fetch(`https://api.beehiiv.com/v2/publications/${PUB_ID}/subscriptions`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      reactivate_existing: true,
      send_welcome_email: true,
    }),
  })

  if (res.ok) return NextResponse.json({ success: true })

  const body = await res.text()
  console.error('[subscribe] Beehiiv API error:', res.status, body.slice(0, 300))
  return NextResponse.json({ error: 'Subscription failed' }, { status: 502 })
}
