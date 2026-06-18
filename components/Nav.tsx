'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Logo from './Logo'
import { IconButton } from './ds/IconButton'
import dynamic from 'next/dynamic'
const SearchModal = dynamic(() => import('./SearchModal'), { ssr: false })

const links = [
  { label: 'Home', href: '/', exact: true },
  { label: 'Episodes', href: '/podcast' },
  { label: 'About', href: '/about' },
]

const SearchIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="7" />
    <path d="m21 21-4.3-4.3" />
  </svg>
)

function HamburgerIcon({ open }: { open: boolean }) {
  const bar: React.CSSProperties = {
    display: 'block', width: '100%', height: 1.5,
    background: 'var(--paper-50)', borderRadius: 1,
    transition: 'transform 220ms ease',
    transformOrigin: 'center',
  }
  return (
    <div style={{ width: 22, height: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <span style={{ ...bar, transform: open ? 'translateY(7.25px) rotate(45deg)' : 'none' }} />
      <span style={{
        ...bar,
        transition: 'visibility 0ms, opacity 150ms ease',
        opacity: open ? 0 : 1,
        visibility: open ? 'hidden' : 'visible',
      }} />
      <span style={{ ...bar, transform: open ? 'translateY(-7.25px) rotate(-45deg)' : 'none' }} />
    </div>
  )
}

function MobileDrawer({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {

  return (
    <>
      {/* Backdrop — starts below header */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 29,
          background: 'rgba(15,14,11,0.6)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 220ms ease',
        }}
      />

      {/* Drawer panel — slides in from right, below header */}
      <div
        style={{
          position: 'fixed', top: 68, right: 0, bottom: 0, zIndex: 41,
          width: 280,
          background: 'rgba(10,9,6,0.88)',
          borderLeft: '1px solid rgba(255,255,255,0.08)',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 280ms cubic-bezier(0.32, 0, 0.15, 1)',
          display: 'flex',
          flexDirection: 'column',
          padding: '28px 24px',
          overflowY: 'auto',
        }}
      >
        {/* Nav links */}
        <nav style={{ display: 'flex', flexDirection: 'column' }}>
          {links.map((link) => {
            const active = link.exact ? pathname === link.href : pathname === link.href || pathname.startsWith(link.href + '/')
            return (
              <Link
                key={link.label}
                href={link.href}
                onClick={onClose}
                style={{
                  padding: '14px 0',
                  fontSize: 22,
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: active ? 'var(--paper-50)' : 'var(--steel-300)',
                  textDecoration: 'none',
                  borderBottom: '1px solid rgba(255,255,255,0.07)',
                  transition: 'color 120ms ease-out',
                }}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* Subscribe CTA */}
        <div style={{ marginTop: 32 }}>
          <Link
            href="/subscribe"
            onClick={onClose}
            style={{
              display: 'inline-flex', alignItems: 'center',
              height: 48, padding: '0 24px',
              borderRadius: 'var(--radius-sm)',
              background: 'var(--accent)',
              color: 'var(--ink-950)',
              fontWeight: 600, fontSize: 15,
              textDecoration: 'none',
            }}
          >
            Subscribe
          </Link>
        </div>
      </div>
    </>
  )
}

export default function Nav() {
  const pathname = usePathname()
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => { setMenuOpen(false) }, [pathname])

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
          background: 'rgba(10,9,6,0.88)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          borderBottom: '1px solid rgba(255,255,255,0.10)',
        }}
      >
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 28px', height: 68, display: 'flex', alignItems: 'center' }}>

          {/* Logo — wordmark hidden on mobile */}
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <Logo variant="monogram" size={34} />
            <span className="cc-nav-wordmark">
              <Logo variant="wordmark" size={28} tone="dark" />
            </span>
          </Link>

          <div style={{ flex: 1 }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Search — desktop only, left of nav links */}
            <span className="hidden md:inline-flex">
              <IconButton label="Search episodes" variant="inverse" onClick={() => setSearchOpen(true)}>
                <SearchIcon />
              </IconButton>
            </span>

            {/* Desktop nav links */}
            <nav className="hidden md:flex" style={{ gap: 6, marginRight: 12 }}>
              {links.map((link) => {
                const active = link.exact ? pathname === link.href : pathname === link.href || pathname.startsWith(link.href + '/')
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

            {/* Subscribe — all screen sizes */}
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

            {/* Search — mobile only, right of Subscribe */}
            <span className="flex md:hidden">
              <IconButton label="Search episodes" variant="inverse" onClick={() => setSearchOpen(true)}>
                <SearchIcon />
              </IconButton>
            </span>

            {/* Hamburger — mobile only */}
            <button
              type="button"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setMenuOpen((v) => !v)}
              className="flex md:hidden"
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 40,
                height: 40,
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                borderRadius: 'var(--radius-sm)',
                padding: 0,
              }}
            >
              <HamburgerIcon open={menuOpen} />
            </button>
          </div>
        </div>
      </header>

      <MobileDrawer open={menuOpen} onClose={() => setMenuOpen(false)} pathname={pathname} />
      <SearchModal open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
