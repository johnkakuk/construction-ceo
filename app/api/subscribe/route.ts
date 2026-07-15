import { NextRequest, NextResponse } from 'next/server'

const FORM_ID = '049df802-6fd1-4840-a7d6-aacd3f747ae9'
const BASE = 'https://subscribe-forms.beehiiv.com'

export async function POST(request: NextRequest) {
  const { email } = await request.json()
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

  // Fetch the form page to get a valid CSRF token + session cookie
  const page = await fetch(`${BASE}/${FORM_ID}`, {
    headers: { 'User-Agent': 'Mozilla/5.0 (compatible)' },
  })
  const html = await page.text()
  const cookieHeader = page.headers.get('set-cookie') ?? ''

  const csrfMatch = html.match(/name="csrf-token"\s+content="([^"]+)"/)
  if (!csrfMatch) return NextResponse.json({ error: 'Could not load form' }, { status: 502 })
  const csrfToken = csrfMatch[1]

  const sessionMatch = cookieHeader.match(/(_beehiiv_session=[^;]+)/)
  const sessionCookie = sessionMatch ? sessionMatch[1] : ''

  // Forward the subscription with matching session + CSRF
  const body = new URLSearchParams({
    authenticity_token: csrfToken,
    form_id: FORM_ID,
    'form[email]': email,
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    referrer: request.headers.get('referer') ?? '',
  })

  const res = await fetch(`${BASE}/api/submit`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Cookie': sessionCookie,
      'Referer': `${BASE}/${FORM_ID}`,
      'User-Agent': 'Mozilla/5.0 (compatible)',
      'X-Requested-With': 'XMLHttpRequest',
    },
    body: body.toString(),
  })

  if (res.ok) return NextResponse.json({ success: true })
  return NextResponse.json({ error: 'Subscription failed' }, { status: 502 })
}
