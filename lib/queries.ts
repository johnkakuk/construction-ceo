import { getClient, isSanityConfigured } from './sanity'
import { episodes as dummyEpisodes, getEpisode as getDummyEpisode, getRelatedEpisodes as getDummyRelated } from './data'
import type { Episode } from './data'

// Shape returned by Sanity GROQ queries matches the Episode type in data.ts
const episodeFields = `
  "slug": slug.current,
  title,
  guestName,
  guestTitle,
  guestCompany,
  guestCtaText,
  guestCtaUrl,
  summary,
  "keyTakeaways": keyTakeaways[],
  publishedAt,
  duration,
  audioUrl,
  featuredImage {
    alt,
    "url": asset->url
  },
  youtubeId,
  transcript,
  seoTitle,
  seoDescription
`

const episodeCardFields = `
  "slug": slug.current,
  title,
  guestName,
  guestTitle,
  guestCompany,
  summary,
  publishedAt,
  duration,
  audioUrl,
  featuredImage {
    alt,
    "url": asset->url
  }
`

export async function getAllEpisodes(): Promise<Episode[]> {
  if (!isSanityConfigured) return dummyEpisodes

  return getClient().fetch(
    `*[_type == "episode"] | order(coalesce(publishedAt, _createdAt) desc) { ${episodeCardFields} }`
  )
}

export async function getEpisodeBySlug(slug: string): Promise<Episode | undefined> {
  if (!isSanityConfigured) return getDummyEpisode(slug)

  return getClient().fetch(
    `*[_type == "episode" && slug.current == $slug][0] {
      ${episodeFields},
      "relatedSlugs": relatedEpisodes[]->slug.current
    }`,
    { slug }
  )
}

export async function getRelatedEpisodes(slugs: string[] = [], currentSlug?: string): Promise<Episode[]> {
  if (!isSanityConfigured) return getDummyRelated(slugs, currentSlug)

  if (slugs?.length) {
    return getClient().fetch(
      `*[_type == "episode" && slug.current in $slugs] { ${episodeCardFields} }`,
      { slugs }
    )
  }

  const pool = await getClient().fetch<Episode[]>(
    `*[_type == "episode" && slug.current != $currentSlug] | order(publishedAt desc)[0...12] { ${episodeCardFields} }`,
    { currentSlug }
  )

  return [...pool].sort(() => Math.random() - 0.5).slice(0, 3)
}

export async function getEpisodeNumber(slug: string): Promise<{ number: number; total: number }> {
  if (!isSanityConfigured) {
    const sorted = [...dummyEpisodes].reverse() // dummy data is desc; reverse = asc = oldest first
    const idx = sorted.findIndex((e) => e.slug === slug)
    return { number: idx === -1 ? 1 : idx + 1, total: dummyEpisodes.length }
  }
  const results = await getClient().fetch<{ slug: string }[]>(
    `*[_type == "episode"] | order(coalesce(publishedAt, _createdAt) asc) { "slug": slug.current }`
  )
  const slugs = results.map((r) => r.slug)
  const idx = slugs.indexOf(slug)
  return { number: idx === -1 ? slugs.length : idx + 1, total: slugs.length }
}

export async function getAllEpisodeSlugs(): Promise<string[]> {
  if (!isSanityConfigured) return dummyEpisodes.map((e) => e.slug)

  const results = await getClient().fetch<{ slug: string }[]>(
    `*[_type == "episode"]{ "slug": slug.current }`
  )
  return results.map((r) => r.slug)
}
