import { NextResponse } from 'next/server'
import { getAllEpisodes } from '@/lib/queries'

export const revalidate = 60

export async function GET() {
  const episodes = await getAllEpisodes()
  const index = episodes.map(({ slug, title, guestName, guestTitle, guestCompany, summary, duration }) => ({
    slug, title, guestName, guestTitle, guestCompany, summary, duration,
  }))
  return NextResponse.json(index)
}
