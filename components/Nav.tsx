'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from './Logo'
import { IconButton } from './ds/IconButton'
import SearchModal from './SearchModal'

const links = [
  { label: 'Episodes', href: '/podcast' },
  { label: 'About', href: '/about' },
]

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
)

export default function Nav() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setSearchOpen((v) => !v)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
    <header
      className="theme-dark"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 30,
        background: scrolled ? 'rgba(22,20,15,0.72)' : 'var(--ink-950)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.10)',
        transition: 'background 200ms ease-out',
      }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px', height: 68, display: 'flex', alignItems: 'center' }}>
        <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
          <Logo variant="monogram" size={34} />
          <Logo variant="wordmark" size={28} tone="dark" />
        </Link>
        <div style={{ flex: 1 }} />
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <nav style={{ display: 'flex', gap: 6 }}>
            {links.map((link) => {
              const active = pathname === link.href || pathname.startsWith(link.href + '/')
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  style={{
                    padding: '8px 12px',
                    fontSize: 14,
                    fontWeight: 500,
                    color: active ? 'var(--paper-50)' : 'var(--concrete-300)',
                    textDecoration: 'none',
                    transition: 'color 120ms ease-out',
                  }}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
          <IconButton label="Search episodes" variant="inverse" onClick={() => setSearchOpen(true)}>
            <SearchIcon />
          </IconButton>
          <Link
            href="/subscribe"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              height: 32,
              padding: '0 12px',
              fontFamily: 'var(--font-sans)',
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: '0.01em',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--accent)',
              color: 'var(--text-on-accent)',
              textDecoration: 'none',
              transition: 'background 120ms ease-out',
            }}
          >
            Subscribe
          </Link>
        </div>
      </div>
    </header>
    <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
