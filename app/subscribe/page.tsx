import type { Metadata } from 'next'
import PlatformCards from './PlatformCards'
import NewsletterForm from './NewsletterForm'

export const metadata: Metadata = {
  title: 'Subscribe — Construction CEO',
  description: 'Listen to Construction CEO on Apple Podcasts, Spotify, or wherever you get your podcasts.',
}

export default function Subscribe() {
  return (
    <>
      {/* Hero */}
      <section style={{ background: 'var(--ink-900)', color: 'var(--paper)', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(120deg, rgba(255,255,255,0.008) 0 18px, transparent 18px 40px)' }} />
        <div style={{ position: 'absolute', top: -100, left: '50%', transform: 'translateX(-50%)', width: 480, height: 480, borderRadius: '50%', background: 'radial-gradient(circle, rgba(192,132,62,0.13), transparent 65%)' }} />
        <div style={{ position: 'relative', maxWidth: 680, margin: '0 auto', padding: '80px 28px 72px', textAlign: 'center' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--ochre-400)', marginBottom: 20 }}>
            Subscribe
          </p>
          <h1 style={{ fontSize: 'clamp(34px, 4vw, 52px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, color: 'var(--paper-50)', marginBottom: 18 }}>
            Listen wherever you get your podcasts.
          </h1>
          <p style={{ fontSize: 18, lineHeight: 1.65, color: 'var(--steel-300)', maxWidth: '46ch', margin: '0 auto' }}>
            New episodes drop regularly. Subscribe so you never miss a conversation.
          </p>
        </div>
      </section>

      {/* Platform cards */}
      <section style={{ maxWidth: 720, margin: '0 auto', padding: '64px 28px' }}>
        <PlatformCards />
      </section>

      {/* Newsletter strip */}
      <section style={{ borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', background: 'var(--surface-raised)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', padding: '48px 28px' }}>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--text-faint)', marginBottom: 10 }}>
            The Brief
          </p>
          <h2 style={{ fontSize: 24, fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 8, color: 'var(--text-strong)' }}>
            Prefer email? Get the episode brief.
          </h2>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', marginBottom: 20, maxWidth: '48ch' }}>
            The argument, the numbers, and the one decision worth stealing — delivered after every episode.
          </p>
          <NewsletterForm />
        </div>
      </section>
    </>
  )
}
