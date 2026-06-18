export const revalidate = 60

import type { Metadata } from 'next'
import { getAllEpisodes } from '@/lib/queries'
import PodcastClient from './PodcastClient'

export const metadata: Metadata = {
  title: 'Episodes — Construction CEO',
  description: 'Browse all Construction CEO podcast episodes.',
}

export default async function Podcast() {
  const episodes = await getAllEpisodes()

  return (
    <>
      {/* Dark title section */}
      <section style={{ background: 'var(--ink-900)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(120deg, rgba(255,255,255,0.008) 0 18px, transparent 18px 40px)' }} />
        <div style={{ position: 'absolute', top: '50%', right: '8%', transform: 'translateY(-50%)', width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, rgba(192,132,62,0.14), transparent 65%)', pointerEvents: 'none' }} />
        <div className="cc-container" style={{ position: 'relative', padding: '64px 0' }}>
          <span className="cc-tick mb-5 block" />
          <p className="cc-eyebrow mb-10" style={{ color: 'var(--ochre-400)' }}>The archive · {episodes.length} episodes</p>
          <h1 className="max-w-3xl font-display font-black leading-tight tracking-[-0.035em]" style={{ fontSize: 'clamp(36px, 4vw, 56px)', color: 'var(--paper-50)' }}>
            Long-form conversations with commercial construction leaders.
          </h1>
        </div>
      </section>

      {/* Episode grid */}
      <div className="cc-container py-14">
        <PodcastClient episodes={episodes} />
      </div>
    </>
  )
}
