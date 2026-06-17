'use client'

import EpisodeCard from '@/components/EpisodeCard'
import { useAudio } from '@/app/AudioProvider'
import type { Episode } from '@/lib/data'

export default function PodcastClient({ episodes }: { episodes: Episode[] }) {
  const { playingSlug, toggle } = useAudio()

  return (
    <div className="grid gap-5 md:grid-cols-2">
      {episodes.map((episode, index) => (
        <EpisodeCard
          key={episode.slug}
          episode={episode}
          layout="feature"
          number={episodes.length - index}
          playing={playingSlug === episode.slug}
          onPlay={() => toggle(episode)}
        />
      ))}
    </div>
  )
}
