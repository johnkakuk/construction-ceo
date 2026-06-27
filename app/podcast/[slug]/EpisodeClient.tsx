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

/* ---- Share modal ---- */
const XIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.748l7.73-8.835L1.254 2.25H8.08l4.252 5.626L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z"/>
  </svg>
)
const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)
const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)
const WhatsAppIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)
const LinkIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71"/>
    <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71"/>
  </svg>
)
const CheckIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5"/>
  </svg>
)
const CloseIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18M6 6l12 12"/>
  </svg>
)

function ShareModal({ episode, onClose }: { episode: Episode; onClose: () => void }) {
  const [copied, setCopied] = useState(false)
  const url = typeof window !== 'undefined' ? window.location.href : `https://constructionceo.com/podcast/${episode.slug}`
  const text = encodeURIComponent(`${episode.title} — Construction CEO`)
  const encodedUrl = encodeURIComponent(url)

  const platforms = [
    { name: 'X', icon: <XIcon />, bg: '#000', href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${text}` },
    { name: 'LinkedIn', icon: <LinkedInIcon />, bg: '#0A66C2', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}` },
    { name: 'Facebook', icon: <FacebookIcon />, bg: '#1877F2', href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}` },
    { name: 'WhatsApp', icon: <WhatsAppIcon />, bg: '#25D366', href: `https://wa.me/?text=${text}%20${encodedUrl}` },
  ]

  function copyLink() {
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, zIndex: 60, background: 'rgba(10,9,6,0.72)', backdropFilter: 'blur(4px)', WebkitBackdropFilter: 'blur(4px)' }}
      />
      {/* Modal */}
      <div style={{
        position: 'fixed', zIndex: 61,
        top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
        width: 'min(400px, calc(100vw - 40px))',
        background: 'var(--surface-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border)',
        boxShadow: '0 24px 64px rgba(0,0,0,0.3)',
        padding: '28px 28px 24px',
      }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
          <h3 style={{ fontSize: 18, fontWeight: 700, letterSpacing: '-0.01em', color: 'var(--text-strong)', margin: 0 }}>
            Share this episode
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: 32, height: 32, border: 'none', background: 'var(--surface-sunken)', borderRadius: 'var(--radius-sm)', cursor: 'pointer', color: 'var(--text-muted)' }}
          >
            <CloseIcon />
          </button>
        </div>

        {/* Platform buttons */}
        <div style={{ display: 'flex', gap: 12, marginBottom: 20 }}>
          {platforms.map(p => (
            <a
              key={p.name}
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share on ${p.name}`}
              style={{
                flex: 1,
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
                padding: '16px 8px',
                borderRadius: 'var(--radius-md)',
                background: p.bg,
                color: '#fff',
                textDecoration: 'none',
                transition: 'opacity 120ms ease-out',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              {p.icon}
              <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.02em' }}>{p.name}</span>
            </a>
          ))}
        </div>

        {/* Copy link */}
        <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
          <div style={{
            flex: 1, height: 40, padding: '0 12px',
            display: 'flex', alignItems: 'center',
            background: 'var(--surface-sunken)', border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--text-muted)',
            overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis',
            userSelect: 'all',
          }}>
            {url}
          </div>
          <button
            type="button"
            onClick={copyLink}
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 6,
              height: 40, padding: '0 14px', flexShrink: 0,
              borderRadius: 'var(--radius-sm)',
              background: copied ? 'var(--accent)' : 'var(--surface-sunken)',
              border: '1px solid var(--border)',
              fontFamily: 'var(--font-sans)', fontSize: 13, fontWeight: 600,
              color: copied ? 'var(--ink-950)' : 'var(--text-strong)',
              cursor: 'pointer',
              transition: 'background 150ms ease, color 150ms ease',
            } as React.CSSProperties}
          >
            {copied ? <CheckIcon /> : <LinkIcon />}
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </>
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
  const [shareOpen, setShareOpen] = useState(false)

  return (
    <>
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
              <IconBtn label="Share" className="cc-btn-icon" onClick={() => setShareOpen(true)}><ShareIcon /></IconBtn>
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

    {shareOpen && <ShareModal episode={episode} onClose={() => setShareOpen(false)} />}
    </>
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
