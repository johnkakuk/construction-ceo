'use client'

import { useState } from 'react'

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    try {
      const res = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })
      setStatus(res.ok ? 'success' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--accent)' }}>
        You're in — check your inbox to confirm.
      </p>
    )
  }

  return (
    <form className="cc-newsletter-form" style={{ display: 'flex', gap: 10, width: '100%' }} onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="you@firm.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        disabled={status === 'loading'}
        className="cc-newsletter-email"
        style={{
          flex: 1, height: 40, padding: '0 14px',
          fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-strong)',
          background: 'var(--surface-card)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)', outline: 'none',
          transition: 'border-color 120ms ease-out',
        }}
      />
      <button
        type="submit"
        disabled={status === 'loading'}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          height: 40, padding: '0 18px',
          fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600,
          borderRadius: 'var(--radius-sm)', border: 'none',
          background: 'var(--accent)', color: 'var(--text-on-accent)',
          cursor: status === 'loading' ? 'wait' : 'pointer',
          whiteSpace: 'nowrap', opacity: status === 'loading' ? 0.7 : 1,
        }}
      >
        {status === 'loading' ? 'Subscribing…' : <><span>Subscribe</span><ArrowIcon /></>}
      </button>
      {status === 'error' && (
        <p style={{ fontSize: 13, color: 'var(--error, #e53e3e)', marginTop: 8 }}>
          Something went wrong — please try again.
        </p>
      )}
    </form>
  )
}

export default function Newsletter() {
  return (
    <section style={{ borderTop: '1px solid var(--border-subtle)', borderBottom: '1px solid var(--border-subtle)', background: 'var(--surface-raised)' }}>
      <div className="cc-newsletter-grid" style={{ maxWidth: 1200, margin: '0 auto', padding: '64px 28px' }}>
        <div>
          <div className="cc-eyebrow" style={{ marginBottom: 12 }}>The Brief</div>
          <h3 style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-0.01em', marginBottom: 8 }}>One concise email for every episode.</h3>
          <p style={{ fontSize: 15, color: 'var(--text-muted)', maxWidth: '46ch', margin: 0 }}>
            Receive the best moments and takeaways from every episode.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', flex: 1, maxWidth: 520 }}>
          <NewsletterForm />
        </div>
      </div>
    </section>
  )
}
