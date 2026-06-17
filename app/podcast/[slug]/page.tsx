export const revalidate = 60

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getAllEpisodeSlugs, getEpisodeBySlug, getRelatedEpisodes, getEpisodeNumber } from '@/lib/queries'
import EpisodeClient from './EpisodeClient'

export async function generateStaticParams() {
  const slugs = await getAllEpisodeSlugs()
  return slugs.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const episode = await getEpisodeBySlug(slug)
  if (!episode) return {}
  return {
    title: `${episode.seoTitle || episode.title} — Construction CEO`,
    description: episode.seoDescription || episode.summary,
  }
}

export default async function EpisodePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [episode, episodeNum] = await Promise.all([
    getEpisodeBySlug(slug),
    getEpisodeNumber(slug),
  ])
  if (!episode) notFound()

  const related = await getRelatedEpisodes(episode.relatedSlugs ?? [], episode.slug)

  return <EpisodeClient episode={episode} related={related} episodeNumber={episodeNum.number} />
}
