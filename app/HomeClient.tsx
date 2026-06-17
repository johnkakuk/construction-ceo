'use client'

import { useState } from 'react'
import Link from 'next/link'
import PlayButton from '@/components/PlayButton'
import EpisodeCard from '@/components/EpisodeCard'
import { Avatar } from '@/components/ds/Avatar'
import { useAudio } from './AudioProvider'
import type { Episode } from '@/lib/data'

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

function DSButton({
  children, variant = 'primary', size = 'md', leftIcon, rightIcon, href, onClick, type = 'button', style,
}: {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost' | 'inverse'
  size?: 'sm' | 'md' | 'lg'
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  href?: string
  onClick?: () => void
  type?: 'button' | 'submit'
  style?: React.CSSProperties
}) {
  const [hover, setHover] = useState(false)
  const sizes = {
    sm: { fontSize: 13, padding: '0 12px', height: 32, gap: 6, radius: 'var(--radius-sm)' },
    md: { fontSize: 14, padding: '0 18px', height: 40, gap: 8, radius: 'var(--radius-sm)' },
    lg: { fontSize: 16, padding: '0 24px', height: 50, gap: 9, radius: 'var(--radius-md)' },
  }
  const s = sizes[size]
  const variants = {
    primary: { background: hover ? 'var(--accent-hover)' : 'var(--accent)', color: 'var(--text-on-accent)', border: '1px solid transparent' },
    secondary: { background: hover ? 'var(--surface-sunken)' : 'transparent', color: 'var(--text-strong)', border: '1px solid var(--border-strong)' },
    ghost: { background: hover ? 'var(--surface-sunken)' : 'transparent', color: 'var(--text-strong)', border: '1px solid transparent' },
    inverse: { background: hover ? 'var(--paper-0)' : 'var(--paper-50)', color: 'var(--ink-900)', border: '1px solid transparent' },
  }
  const v = variants[variant]
  const common: React.CSSProperties = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    gap: s.gap, height: s.height, padding: s.padding,
    fontFamily: 'var(--font-sans)', fontSize: s.fontSize, fontWeight: 600, letterSpacing: '0.01em', lineHeight: 1,
    borderRadius: s.radius, cursor: 'pointer', whiteSpace: 'nowrap', userSelect: 'none',
    transition: 'background 120ms ease-out',
    textDecoration: 'none',
    ...v, ...style,
  }
  if (href) {
    return (
      <Link href={href} style={common} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        {leftIcon && <span style={{ display: 'inline-flex' }}>{leftIcon}</span>}
        {children}
        {rightIcon && <span style={{ display: 'inline-flex' }}>{rightIcon}</span>}
      </Link>
    )
  }
  return (
    <button type={type} onClick={onClick} style={common} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      {leftIcon && <span style={{ display: 'inline-flex' }}>{leftIcon}</span>}
      {children}
      {rightIcon && <span style={{ display: 'inline-flex' }}>{rightIcon}</span>}
    </button>
  )
}

/* ---- Hero ---- */
function Hero({ episode }: { episode: Episode }) {
  const { playingSlug, toggle } = useAudio()
  const playing = playingSlug === episode.slug
  const guestRole = [episode.guestTitle, episode.guestCompany].filter(Boolean).join(' · ')

  return (
    <section className="theme-dark" style={{ background: 'var(--ink-900)', color: 'var(--paper)', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(120deg, rgba(255,255,255,0.008) 0 18px, transparent 18px 40px)' }} />
      <div style={{ position: 'absolute', top: -120, right: -80, width: 360, height: 360, borderRadius: '50%', background: 'radial-gradient(circle, rgba(192,132,62,0.16), transparent 65%)' }} />
      <div style={{ position: 'relative', maxWidth: 1200, margin: '0 auto', padding: '64px 28px', display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: 56, alignItems: 'center' }}>
        <div>
          <div className="cc-eyebrow" style={{ color: 'var(--ochre-400)', marginBottom: 18 }}>
            Latest episode{episode.duration ? ` · ${episode.duration}` : ''}
          </div>
          <h1 style={{ fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 800, letterSpacing: '-0.025em', lineHeight: 1.02, color: 'var(--paper)', marginBottom: 20, maxWidth: '15ch' }}>
            {episode.title}
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.6, color: 'var(--steel-300)', maxWidth: '52ch', marginBottom: 28 }}>
            {episode.summary}
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 30 }}>
            <Avatar name={episode.guestName} size={44} duotone />
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, color: 'var(--paper-50)' }}>{episode.guestName}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--steel-400)' }}>{guestRole}</div>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <DSButton
              variant="primary"
              size="lg"
              leftIcon={
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  {playing
                    ? <><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></>
                    : <path d="M8 5v14l11-7z"/>}
                </svg>
              }
              onClick={() => toggle(episode)}
              style={{ minWidth: 172, justifyContent: 'center' }}
            >
              {playing ? 'Pause' : 'Play episode'}
            </DSButton>
            <DSButton
              variant="secondary"
              size="lg"
              rightIcon={<ArrowIcon />}
              href={`/podcast/${episode.slug}#notes`}
              style={{ background: 'transparent', color: 'var(--paper)', borderColor: 'var(--border-inverse)' }}
            >
              Show notes
            </DSButton>
          </div>
        </div>

        <div>
          <div style={{
            aspectRatio: '16 / 9',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            border: '1px solid var(--border-inverse)',
            position: 'relative',
            background: 'linear-gradient(155deg, #3a3f47, #20242b 55%, #14161a)',
          }}>
            {episode.featuredImage?.url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={episode.featuredImage.url} alt={episode.title} style={{ width: '100%', height: '100%', objectFit: 'cover', filter: 'grayscale(1) contrast(1.05) brightness(0.9)', mixBlendMode: 'luminosity' }} />
            ) : null}
<div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <PlayButton playing={playing} onToggle={() => toggle(episode)} size={72} />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ---- Episode list ---- */
function EpisodeList({ episodes, total }: { episodes: Episode[]; total: number }) {
  const { playingSlug, toggle } = useAudio()

  return (
    <section style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 28px' }}>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 32 }}>
        <div>
          <div className="cc-eyebrow" style={{ marginBottom: 10 }}>The archive · {total} episodes</div>
          <h2 style={{ fontSize: 34, fontWeight: 800, letterSpacing: '-0.02em', margin: 0 }}>Recent conversations</h2>
        </div>
        <DSButton variant="ghost" rightIcon={<ArrowIcon />} href="/podcast">Browse all</DSButton>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {episodes.map((ep, index) => (
          <EpisodeCard
            key={ep.slug}
            episode={ep}
            layout="row"
            number={episodes.length - index}
            playing={playingSlug === ep.slug}
            onPlay={() => toggle(ep)}
          />
        ))}
      </div>
    </section>
  )
}

/* ---- Newsletter ---- */
function Newsletter() {
  return (
    <section style={{ borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', background: 'var(--surface-raised)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 28px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48, alignItems: 'center' }}>
        <div>
          <div className="cc-eyebrow" style={{ marginBottom: 12 }}>The Brief</div>
          <h3 style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 8 }}>One signal-dense email per episode.</h3>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', maxWidth: '46ch', margin: 0 }}>
            The argument, the numbers, and the one decision worth stealing — for operators who don&apos;t have an hour.
          </p>
        </div>
        <form style={{ display: 'flex', gap: 10 }} onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="you@firm.com"
            style={{
              flex: 1, height: 40, padding: '0 14px',
              fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-strong)',
              background: 'var(--surface-card)', border: '1px solid var(--border)',
              borderRadius: 'var(--radius-sm)', outline: 'none',
              transition: 'border-color 120ms ease-out',
            }}
          />
          <DSButton variant="primary" type="submit" rightIcon={<ArrowIcon />}>Subscribe</DSButton>
        </form>
      </div>
    </section>
  )
}

/* ---- App ---- */
export default function HomeClient({ episodes }: { episodes: Episode[] }) {
  const featured = episodes[0]
  const rest = episodes.slice(1)

  if (!featured) {
    return (
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 28px' }}>
        <p className="cc-eyebrow" style={{ marginBottom: 16 }}>Construction CEO</p>
        <h1 style={{ fontSize: 48, fontWeight: 800, letterSpacing: '-0.03em' }}>Episodes coming soon.</h1>
      </div>
    )
  }

  return (
    <>
      <Hero episode={featured} />
      <EpisodeList episodes={rest} total={episodes.length} />
      <Newsletter />
    </>
  )
}
