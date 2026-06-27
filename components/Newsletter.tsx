'use client'

const ArrowIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
)

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
        <form className="cc-newsletter-form" style={{ display: 'flex', gap: 10 }} onSubmit={(e) => e.preventDefault()}>
          <input
            type="email"
            placeholder="you@firm.com"
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
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              height: 40, padding: '0 18px',
              fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600,
              borderRadius: 'var(--radius-sm)', border: 'none',
              background: 'var(--accent)', color: 'var(--text-on-accent)',
              cursor: 'pointer', whiteSpace: 'nowrap',
            }}
          >
            Subscribe <ArrowIcon />
          </button>
        </form>
      </div>
    </section>
  )
}
