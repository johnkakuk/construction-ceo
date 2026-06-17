'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useAudio } from '@/app/AudioProvider'
import { Avatar } from '@/components/ds/Avatar'
import { Timestamp } from '@/components/ds/Timestamp'
import { Tabs } from '@/components/ds/Tabs'
import PlayButton from '@/components/PlayButton'
import type { Episode } from '@/lib/data'

/* ---- Icons ---- */
const ShareIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/>
    <path d="M8.6 13.5l6.8 4M15.4 6.5l-6.8 4"/>
  </svg>
)
const DownloadIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v12M7 10l5 5 5-5M5 21h14"/>
  </svg>
)
const ArrowIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6"/>
  </svg>
)

function IconBtn({ label, onClick, children, className }: { label: string; onClick?: () => void; children: React.ReactNode; className?: string }) {
  const [hover, setHover] = useState(false)
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={className}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 40, height: 40,
        borderRadius: 'var(--radius-sm)',
        border: '1px solid var(--border-inverse)',
        background: hover ? 'rgba(255,255,255,0.08)' : 'transparent',
        color: 'var(--paper)',
        cursor: 'pointer',
        transition: 'background 120ms ease-out',
      }}
    >
      {children}
    </button>
  )
}

/* ---- Speaker detection ---- */
const SPEAKER_COLORS = ['#B8722E', '#3A7FA8', '#7251A8', '#2E8A5C']

function buildSpeakerMap(transcript: string): Map<string, string> {
  const regex = /(?:^|\n)([A-Z][a-zA-Z'-]*(?: [A-Z][a-zA-Z'-]*)*):/g
  const map = new Map<string, string>()
  let match: RegExpExecArray | null
  while ((match = regex.exec(transcript)) !== null) {
    const name = match[1]
    if (!map.has(name)) {
      map.set(name, SPEAKER_COLORS[map.size % SPEAKER_COLORS.length])
    }
  }
  return map
}

/* ---- Hero ---- */
function EpisodeHero({ episode, episodeNumber }: { episode: Episode; episodeNumber?: number }) {
  const { playingSlug, toggle } = useAudio()
  const isPlaying = playingSlug === episode.slug
  const guestRole = [episode.guestTitle, episode.guestCompany].filter(Boolean).join(' · ')

  return (
    <section style={{ background: 'var(--ink-900)', color: 'var(--paper)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(120deg, rgba(255,255,255,0.008) 0 18px, transparent 18px 40px)' }} />
      <div style={{ position: 'relative', maxWidth: 1180, margin: '0 auto', padding: '40px 28px 44px' }}>

        {/* Breadcrumb */}
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--steel-400)', letterSpacing: '0.04em', marginBottom: 24 }}>
          <Link href="/podcast" style={{ color: 'var(--steel-300)', textDecoration: 'none' }}>Episodes</Link>
          <span style={{ margin: '0 8px' }}>/</span>
          <span style={{ color: 'var(--ochre-400)', overflow: 'hidden', textOverflow: 'ellipsis' }}>{episode.title}</span>
        </div>

        <div className="cc-episode-hero-grid">
          {/* Left column */}
          <div>
            {/* Badges */}
            <div style={{ display: 'flex', gap: 8, marginBottom: 18 }}>
              <span style={{ display: 'inline-flex', alignItems: 'center', height: 26, padding: '0 10px', borderRadius: 'var(--radius-sm)', background: 'var(--accent)', fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--ink-950)' }}>
                {episodeNumber != null ? `Episode ${episodeNumber}` : 'Episode'}
              </span>
              {episode.duration && (
                <span style={{ display: 'inline-flex', alignItems: 'center', height: 26, padding: '0 10px', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-inverse)', fontFamily: 'var(--font-mono)', fontSize: 11, letterSpacing: '0.06em', color: 'var(--steel-300)' }}>
                  {episode.duration}
                </span>
              )}
            </div>

            {/* Title */}
            <h1 style={{ fontSize: 'clamp(32px, 3.6vw, 50px)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.03, marginBottom: 20, maxWidth: '16ch', color: 'var(--paper-50)' }}>
              {episode.title}
            </h1>

            {/* Guest row */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 28, flexWrap: 'wrap' }}>
              <Avatar name={episode.guestName} size={40} duotone />
              <div>
                <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--paper-50)' }}>{episode.guestName || 'Construction CEO'}</div>
                {guestRole && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--steel-400)' }}>{guestRole}</div>}
              </div>
              {episode.publishedAt && (
                <>
                  <div style={{ width: 1, height: 32, background: 'var(--border-inverse)', flexShrink: 0 }} />
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--steel-400)' }}>
                    {formatDate(episode.publishedAt)}
                  </div>
                </>
              )}
            </div>

            {/* Actions */}
            <div className="cc-btn-row" style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <button
                type="button"
                onClick={() => toggle(episode)}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 9,
                  height: 50, padding: '0 22px',
                  borderRadius: 'var(--radius-md)',
                  border: 'none',
                  background: 'var(--accent)',
                  fontFamily: 'var(--font-sans)', fontSize: 16, fontWeight: 600,
                  color: 'var(--ink-950)',
                  cursor: 'pointer',
                  minWidth: 172,
                  justifyContent: 'center',
                  transition: 'background 120ms ease-out',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  {isPlaying
                    ? <><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></>
                    : <path d="M8 5v14l11-7z"/>}
                </svg>
                {isPlaying ? 'Pause' : 'Play episode'}
              </button>
              <IconBtn label="Share" className="cc-btn-icon"><ShareIcon /></IconBtn>
              {episode.audioUrl && <IconBtn label="Download" className="cc-btn-icon"><DownloadIcon /></IconBtn>}
            </div>
          </div>

          {/* Right column — 16:9 art card (hidden on mobile) */}
          <div className="cc-episode-hero-art" style={{
            aspectRatio: '16 / 9',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            border: '1px solid var(--border-inverse)',
            position: 'relative',
            background: 'var(--ink-800)',
          }}>
            {episode.featuredImage?.url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={episode.featuredImage.url} alt={episode.featuredImage.alt || episode.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1) contrast(1.05) brightness(0.85)', mixBlendMode: 'luminosity' }} />
            ) : null}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PlayButton playing={isPlaying} onToggle={() => toggle(episode)} size={76} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---- Show Notes tab ---- */
function ShowNotes({ episode }: { episode: Episode }) {
  return (
    <div>
      {episode.summary && (
        <p style={{ fontSize: 18, lineHeight: 1.65, color: 'var(--text-body)', marginBottom: 28 }}>
          {episode.summary}
        </p>
      )}

      {!!episode.keyTakeaways?.length && (
        <div style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', background: 'var(--surface-raised)', padding: 24 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 20 }}>
            Key takeaways
          </p>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {episode.keyTakeaways.map((point, index) => (
              <div key={point} style={{ display: 'grid', gridTemplateColumns: '44px 1fr', gap: 12, padding: '14px 0', borderTop: index > 0 ? '1px solid var(--border-subtle)' : 'none', alignItems: 'start' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-faint)', paddingTop: 2 }}>
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span style={{ fontSize: 15, fontWeight: 500, lineHeight: 1.55, color: 'var(--text-body)' }}>{point}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

/* ---- Video tab ---- */
function VideoTab({ episode }: { episode: Episode }) {
  return (
    <div>
      <iframe
        src={`https://www.youtube.com/embed/${episode.youtubeId}`}
        title={episode.title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        style={{ width: '100%', maxWidth: '100%', aspectRatio: '16 / 9', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', display: 'block' }}
      />
      <a
        href="https://www.youtube.com/@ConstructionCEO?sub_confirmation=1"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          marginTop: 16, height: 36, padding: '0 14px',
          borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)',
          fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600,
          color: 'var(--text-strong)', textDecoration: 'none',
          background: 'var(--surface-sunken)',
        }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.6 2.8 12 2.8 12 2.8s-4.6 0-6.8.1c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.2.7 11.5v2.1c0 2.3.3 4.5.3 4.5s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.5 22.2 12 22.2 12 22.2s4.6 0 6.8-.2c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.2.3-4.5v-2.1C23.3 9.2 23 7 23 7zM9.7 15.5V8.4l8.1 3.6-8.1 3.5z"/>
        </svg>
        Subscribe on YouTube
      </a>
    </div>
  )
}

/* ---- Transcript tab ---- */
function TranscriptView({ episode }: { episode: Episode }) {
  const { playFrom } = useAudio()

  if (!episode.transcript) {
    return <p style={{ fontSize: 15, color: 'var(--text-muted)' }}>Transcript not yet available for this episode.</p>
  }

  const tsRegex = /\[(\d{2}):(\d{2}):(\d{2})\]/
  const speakerMap = buildSpeakerMap(episode.transcript)
  const speakerPrefix = /^([A-Z][a-zA-Z'-]*(?: [A-Z][a-zA-Z'-]*)*):\s*/

  function renderText(text: string) {
    const m = speakerPrefix.exec(text)
    if (m) {
      const color = speakerMap.get(m[1])
      if (color) {
        const rest = text.slice(m[0].length)
        return (
          <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-body)', margin: 0 }}>
            <strong style={{ color, fontWeight: 700 }}>{m[1]}:</strong>{rest && <> {rest}</>}
          </p>
        )
      }
    }
    return <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--text-body)', margin: 0 }}>{text}</p>
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {episode.transcript.split('\n').map((line, i) => {
        if (!line.trim()) {
          return <div key={i} style={{ height: '0.6em' }} />
        }

        const match = tsRegex.exec(line)
        if (match) {
          const seconds = parseInt(match[1]) * 3600 + parseInt(match[2]) * 60 + parseInt(match[3])
          const text = line.replace(tsRegex, '').trimStart()
          return (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '52px 1fr', gap: 16, alignItems: 'baseline' }}>
              <button
                type="button"
                onClick={() => playFrom(episode, seconds)}
                style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
              >
                <Timestamp seconds={seconds} />
              </button>
              {renderText(text)}
            </div>
          )
        }

        return (
          <div key={i} style={{ display: 'grid', gridTemplateColumns: '52px 1fr', gap: 16 }}>
            <span />
            {renderText(line)}
          </div>
        )
      })}
    </div>
  )
}

/* ---- Sidebar ---- */
function Sidebar({ episode, related }: { episode: Episode; related: Episode[] }) {
  const guestRole = [episode.guestTitle, episode.guestCompany].filter(Boolean).join(' · ')

  return (
    <aside className="cc-episode-sidebar" style={{ flexDirection: 'column', gap: 20 }}>
      {/* Guest card */}
      <div className="cc-episode-guest-card" style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', background: 'var(--surface-card)', padding: 24 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
          <Avatar name={episode.guestName} size={52} duotone />
          <div>
            <div style={{ fontWeight: 700, fontSize: 16, color: 'var(--text-strong)' }}>{episode.guestName || 'Construction CEO'}</div>
            {guestRole && <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', marginTop: 3 }}>{guestRole}</div>}
          </div>
        </div>
        <a
          href={episode.guestCtaUrl ?? '/podcast'}
          target={episode.guestCtaUrl ? '_blank' : undefined}
          rel={episode.guestCtaUrl ? 'noopener noreferrer' : undefined}
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            width: '100%', padding: '10px 14px',
            borderRadius: 'var(--radius-sm)', border: '1px solid var(--border)',
            background: 'var(--surface-sunken)',
            fontSize: 13, fontWeight: 600, color: 'var(--text-strong)',
            textDecoration: 'none',
            boxSizing: 'border-box',
          }}
        >
          {episode.guestCtaText ?? 'Browse all episodes'}
          <ArrowIcon />
        </a>
      </div>

      {/* Related episodes */}
      {related.length > 0 && (
        <div className="cc-episode-related" style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', background: 'var(--surface-card)', padding: 24 }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 16 }}>
            Related episodes
          </p>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {related.map((ep, i) => (
              <Link
                key={ep.slug}
                href={`/podcast/${ep.slug}`}
                style={{
                  display: 'block',
                  padding: '14px 0',
                  borderTop: i > 0 ? '1px solid var(--border-subtle)' : 'none',
                  textDecoration: 'none',
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-faint)', marginBottom: 5 }}>
                  {ep.guestName || 'Construction CEO'}
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, lineHeight: 1.35, color: 'var(--text-strong)' }}>{ep.title}</div>
                {ep.duration && (
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: 'var(--text-muted)', marginTop: 5 }}>{ep.duration}</div>
                )}
              </Link>
            ))}
          </div>
        </div>
      )}
    </aside>
  )
}

/* ---- Root ---- */
export default function EpisodeClient({ episode, related, episodeNumber }: { episode: Episode; related: Episode[]; episodeNumber?: number }) {
  const [tab, setTab] = useState('notes')
  const hasTranscript = !!episode.transcript

  const tabItems = [
    { id: 'notes', label: 'Show notes' },
    ...(episode.youtubeId ? [{ id: 'video', label: 'Video' }] : []),
    ...(hasTranscript ? [{ id: 'transcript', label: 'Transcript', badge: episode.duration }] : []),
  ]

  return (
    <>
      <EpisodeHero episode={episode} episodeNumber={episodeNumber} />

      <section className="cc-episode-layout" style={{ maxWidth: 1180, margin: '0 auto', padding: '48px 28px' }}>
        <div className="cc-episode-tabs-div">
          <Tabs value={tab} onChange={setTab} items={tabItems} style={{ marginBottom: 32 }} />
          {tab === 'notes' && <ShowNotes episode={episode} />}
          {tab === 'video' && <VideoTab episode={episode} />}
          {tab === 'transcript' && <TranscriptView episode={episode} />}
        </div>
        <Sidebar episode={episode} related={related} />
      </section>
    </>
  )
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(value))
}
