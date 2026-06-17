'use client'

import { useState } from 'react'

const PLATFORMS = [
  {
    name: 'Apple Podcasts',
    href: 'https://podcasts.apple.com/us/podcast/construction-ceo-podcast/id1896663374',
    description: 'Subscribe and get new episodes delivered automatically.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M16 1c.1 1.3-.4 2.5-1.2 3.4-.8.9-2 1.6-3.2 1.5-.1-1.2.5-2.5 1.2-3.3C13.6 1.6 14.9 1 16 1zm3.6 16.3c-.5 1.2-.8 1.7-1.5 2.8-1 1.5-2.4 3.4-4.1 3.4-1.5 0-1.9-1-4-1-2 0-2.5 1-4 1-1.7 0-3-1.7-4-3.2C-1 19-1.3 13.7 1.3 11c1.2-1.4 2.7-2.2 4.3-2.2 1.6 0 2.6 1 4 1 1.3 0 2.1-1 4-1 1.4 0 2.9.8 4 2.1-3.5 1.9-3 7 .9 8.4z" />
      </svg>
    ),
  },
  {
    name: 'Spotify',
    href: 'https://open.spotify.com/show/033gFccjNwRC5NPHkGpApG',
    description: 'Follow the show and listen right in Spotify.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2a10 10 0 100 20 10 10 0 000-20zm4.6 14.4a.6.6 0 01-.9.2c-2.4-1.5-5.5-1.8-9.1-1a.6.6 0 11-.3-1.2c4-.9 7.4-.5 10.1 1.1.3.2.4.6.2.9zm1.2-2.7a.8.8 0 01-1 .3c-2.8-1.7-7-2.2-10.2-1.2a.8.8 0 11-.5-1.5c3.7-1.1 8.3-.6 11.5 1.4.3.2.5.7.2 1zm.1-2.8C14.6 8.9 9 8.7 5.8 9.7a.9.9 0 11-.6-1.8C9 6.7 15.2 6.9 19 9.2a.9.9 0 11-1 1.6z" />
      </svg>
    ),
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/@ConstructionCEO',
    description: 'Watch full video episodes and clips on YouTube.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
        <path d="M23 7s-.3-2-1.2-2.8c-1.1-1.2-2.4-1.2-3-1.3C16.6 2.8 12 2.8 12 2.8s-4.6 0-6.8.1c-.6.1-1.9.1-3 1.3C1.3 5 1 7 1 7S.7 9.2.7 11.5v2.1c0 2.3.3 4.5.3 4.5s.3 2 1.2 2.8c1.1 1.2 2.6 1.1 3.3 1.2C7.5 22.2 12 22.2 12 22.2s4.6 0 6.8-.2c.6-.1 1.9-.1 3-1.3.9-.8 1.2-2.8 1.2-2.8s.3-2.2.3-4.5v-2.1C23.3 9.2 23 7 23 7zM9.7 15.5V8.4l8.1 3.6-8.1 3.5z" />
      </svg>
    ),
  },
  {
    name: 'RSS Feed',
    href: '/rss.xml',
    description: 'Add the feed URL to any podcast app you already use.',
    icon: (
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 11a9 9 0 0 1 9 9" />
        <path d="M4 4a16 16 0 0 1 16 16" />
        <circle cx="5" cy="19" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
]

function PlatformCard({ name, href, description, icon }: typeof PLATFORMS[number]) {
  const [hover, setHover] = useState(false)
  const isExternal = !href.startsWith('/')

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 20,
        padding: '24px 28px',
        borderRadius: 'var(--radius-lg)',
        border: `1px solid ${hover ? 'var(--border-strong)' : 'var(--border)'}`,
        background: 'var(--surface-card)',
        textDecoration: 'none',
        boxShadow: hover ? 'var(--shadow-md)' : 'none',
        transition: 'border-color 150ms ease-out, box-shadow 150ms ease-out',
      }}
    >
      <span style={{ color: 'var(--text-strong)', flexShrink: 0 }}>{icon}</span>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 17, fontWeight: 700, color: 'var(--text-strong)', marginBottom: 3 }}>{name}</div>
        <div style={{ fontSize: 14, color: 'var(--text-muted)' }}>{description}</div>
      </div>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-faint)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
        <path d="M5 12h14M13 6l6 6-6 6" />
      </svg>
    </a>
  )
}

export default function PlatformCards() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
      {PLATFORMS.map((p) => <PlatformCard key={p.name} {...p} />)}
    </div>
  )
}
