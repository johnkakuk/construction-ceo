'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Avatar } from './ds/Avatar'
import { Tag } from './ds/Tag'
import { Timestamp } from './ds/Timestamp'
import PlayButton from './PlayButton'
import { MarqueeText } from './ds/MarqueeText'
import type { Episode } from '@/lib/data'

type EpisodeCardProps = {
  episode: Episode
  layout?: 'row' | 'feature'
  number?: string | number
  playing?: boolean
  onPlay?: () => void
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value))
}

export default function EpisodeCard({ episode, layout = 'row', number, playing = false, onPlay }: EpisodeCardProps) {
  const [hover, setHover] = useState(false)
  const router = useRouter()
  const href = `/podcast/${episode.slug}`
  const guestRole = [episode.guestTitle, episode.guestCompany].filter(Boolean).join(', ')

  if (layout === 'feature') {
    return (
      <div
        onClick={() => router.push(href)}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          display: 'flex',
          flexDirection: 'column',
          background: 'var(--surface-card)',
          border: `1px solid ${hover ? 'var(--border-strong)' : 'var(--border)'}`,
          borderRadius: 'var(--radius-md)',
          overflow: 'hidden',
          cursor: 'pointer',
          transition: 'border-color 150ms ease-out, box-shadow 150ms ease-out',
          boxShadow: hover ? 'var(--shadow-sm)' : 'var(--shadow-xs)',
        }}
      >
        {/* 16:9 image — no overlaid number or play button */}
        <div style={{ position: 'relative', aspectRatio: '16 / 9', background: 'var(--ink-800)' }}>
          {episode.featuredImage?.url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={episode.featuredImage.url} alt={episode.featuredImage.alt || episode.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : null}
        </div>

        {/* Details — overline → title (with increased gap) → play+number row → guest → duration */}
        <div style={{ padding: 20, display: 'flex', flexDirection: 'column', gap: 0 }}>
          {episode.publishedAt && (
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 10 }}>
              {formatDate(episode.publishedAt)}
            </div>
          )}
          <h3 style={{ margin: '0 0 16px', fontFamily: 'var(--font-display)', fontSize: 'var(--text-xl)', fontWeight: 700, lineHeight: 'var(--leading-snug)', letterSpacing: '-0.015em', color: 'var(--text-strong)' }}>
            {episode.title}
          </h3>

          {/* Action row */}
          <div className="cc-btn-row" style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <button
              onClick={(e) => { e.stopPropagation(); onPlay?.() }}
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8, height: 40, padding: '0 16px',
                borderRadius: 'var(--radius-sm)', border: 'none',
                fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600,
                color: 'var(--ink-950)', background: 'var(--accent)',
                cursor: 'pointer', whiteSpace: 'nowrap', minWidth: 139,
              }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                {playing
                  ? <><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></>
                  : <path d="M8 5v14l11-7z"/>}
              </svg>
              {playing ? 'Pause' : 'Play episode'}
            </button>
            <a
              href={href}
              onClick={(e) => e.stopPropagation()}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 7, height: 40, padding: '0 16px',
                borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)',
                fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600,
                color: 'var(--text-strong)', textDecoration: 'none',
                background: 'transparent', whiteSpace: 'nowrap',
              }}
            >
              Show notes
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M13 6l6 6-6 6"/>
              </svg>
            </a>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 10, paddingTop: 12, borderTop: '1px solid var(--border-soft)' }}>
            <Avatar name={episode.guestName} size={32} />
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--text-strong)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{episode.guestName || 'Construction CEO'}</div>
              {guestRole && <div style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{guestRole}</div>}
            </div>
            {episode.duration && (
              <div style={{ marginLeft: 'auto', flexShrink: 0 }}>
                <Timestamp>{episode.duration}</Timestamp>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  // DS row layout: PlayButton + Avatar(duotone) + title/guest + duration
  return (
    <div
      onClick={() => router.push(href)}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 16,
        padding: '16px 20px',
        background: 'var(--surface-card)',
        border: `1px solid ${hover ? 'var(--border-strong)' : 'var(--border)'}`,
        borderRadius: 'var(--radius-md)',
        boxShadow: hover ? 'var(--shadow-sm)' : 'var(--shadow-xs)',
        cursor: 'pointer',
        transition: 'border-color 150ms ease-out, box-shadow 150ms ease-out',
      }}
    >
      <PlayButton
        playing={playing}
        variant="outline"
        size={44}
        onToggle={(e) => { e.stopPropagation(); onPlay?.() }}
      />
      <Avatar name={episode.guestName} size={48} duotone />
      <div style={{ flex: 1, minWidth: 0 }}>
        {number !== undefined && (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 9, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 4 }}>
            EP {number}
          </div>
        )}
        <MarqueeText style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 700,
          fontSize: 'var(--text-lg)',
          lineHeight: 'var(--leading-snug)',
          letterSpacing: '-0.012em',
          color: 'var(--text-strong)',
          marginBottom: 4,
        }}>
          {episode.title}
        </MarqueeText>
        <MarqueeText style={{ fontSize: 'var(--text-xs)', color: 'var(--text-muted)' }}>
          {`${episode.guestName || 'Construction CEO'}${guestRole ? ` — ${guestRole}` : ''}`}
        </MarqueeText>
      </div>
      {episode.duration && (
        <div className="cc-episode-duration" style={{ flexShrink: 0, alignSelf: 'flex-start', paddingTop: 4 }}>
          <Timestamp>{episode.duration}</Timestamp>
        </div>
      )}
    </div>
  )
}
