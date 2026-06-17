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

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div style={{ width: 22, height: 16, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <span style={{
        display: 'block', width: '100%', height: 1.5,
        background: 'var(--paper-50)', borderRadius: 1,
        transition: 'transform 220ms ease',
        transformOrigin: 'center',
        transform: open ? 'translateY(7.25px) rotate(45deg)' : 'none',
      }} />
      <span style={{
        display: 'block', width: '100%', height: 1.5,
        background: 'var(--paper-50)', borderRadius: 1,
        transition: 'opacity 150ms ease',
        opacity: open ? 0 : 1,
      }} />
      <span style={{
        display: 'block', width: '100%', height: 1.5,
        background: 'var(--paper-50)', borderRadius: 1,
        transition: 'transform 220ms ease',
        transformOrigin: 'center',
        transform: open ? 'translateY(-7.25px) rotate(-45deg)' : 'none',
      }} />
    </div>
  )
}

function MobileDrawer({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 40,
          background: 'rgba(15,14,11,0.6)',
          backdropFilter: 'blur(2px)',
          WebkitBackdropFilter: 'blur(2px)',
          opacity: open ? 1 : 0,
          pointerEvents: open ? 'auto' : 'none',
          transition: 'opacity 220ms ease',
        }}
      />

      {/* Drawer panel */}
      <div
        style={{
          position: 'fixed', top: 0, right: 0, bottom: 0, zIndex: 41,
          width: 280,
          background: 'var(--ink-900)',
          borderLeft: '1px solid rgba(255,255,255,0.08)',
          transform: open ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 280ms cubic-bezier(0.32, 0, 0.15, 1)',
          display: 'flex',
          flexDirection: 'column',
          padding: '28px 24px',
          overflowY: 'auto',
        }}
      >
        {/* Full logo */}
        <Link href="/" onClick={onClose} style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 40, textDecoration: 'none' }}>
          <Logo variant="monogram" size={32} />
          <Logo variant="wordmark" size={24} tone="dark" />
        </Link>

        {/* Nav links */}
        <nav style={{ display: 'flex', flexDirection: 'column' }}>
          {links.map((link) => {
            const active = pathname === link.href || pathname.startsWith(link.href + '/')
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
  const [scrolled, setScrolled] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => { setMenuOpen(false) }, [pathname])

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

          {/* Logo — wordmark hidden on mobile */}
          <Link href="/" style={{ display: 'inline-flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
            <Logo variant="monogram" size={34} />
            <span className="cc-nav-wordmark">
              <Logo variant="wordmark" size={28} tone="dark" />
            </span>
          </Link>

          <div style={{ flex: 1 }} />

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Desktop nav links */}
            <nav className="hidden md:flex" style={{ gap: 6, marginRight: 12 }}>
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

            {/* Subscribe — desktop only */}
            <Link
              href="/subscribe"
              className="hidden md:inline-flex"
              style={{
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
