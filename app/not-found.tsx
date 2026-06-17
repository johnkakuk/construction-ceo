import Link from 'next/link'

export default function NotFound() {
  return (
    <div style={{
      minHeight: '80vh',
      background: 'var(--ink-900)',
      color: 'var(--paper)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      {/* Stripes */}
      <div style={{ position: 'absolute', inset: 0, background: 'repeating-linear-gradient(120deg, rgba(255,255,255,0.008) 0 18px, transparent 18px 40px)' }} />

      {/* Ochre glow */}
      <div style={{ position: 'absolute', top: '30%', left: '50%', transform: 'translate(-50%, -50%)', width: 600, height: 600, borderRadius: '50%', background: 'radial-gradient(circle, rgba(192,132,62,0.10), transparent 65%)', pointerEvents: 'none' }} />

      {/* Large ghost 404 */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        fontFamily: 'var(--font-display)',
        fontSize: 'clamp(180px, 28vw, 320px)',
        fontWeight: 900,
        letterSpacing: '-0.05em',
        lineHeight: 1,
        color: 'transparent',
        WebkitTextStroke: '1px rgba(255,255,255,0.06)',
        userSelect: 'none',
        whiteSpace: 'nowrap',
      }}>
        404
      </div>

      {/* Content */}
      <div style={{ position: 'relative', textAlign: 'center', padding: '0 28px', maxWidth: 520 }}>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--ochre-400)', marginBottom: 20 }}>
          Page not found
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, letterSpacing: '-0.03em', lineHeight: 1.05, color: 'var(--paper-50)', marginBottom: 16 }}>
          This blueprint was never filed.
        </h1>
        <p style={{ fontSize: 17, lineHeight: 1.65, color: 'var(--steel-300)', marginBottom: 36 }}>
          The page you're looking for doesn't exist, was moved, or didn't pass inspection.
        </p>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
          <Link
            href="/"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              height: 46, padding: '0 22px',
              borderRadius: 'var(--radius-md)', border: 'none',
              background: 'var(--accent)',
              fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600,
              color: 'var(--ink-950)', textDecoration: 'none',
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12L12 3l9 9"/><path d="M9 21V12h6v9"/>
            </svg>
            Back to home
          </Link>
          <Link
            href="/podcast"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              height: 46, padding: '0 22px',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--border-inverse)',
              background: 'transparent',
              fontFamily: 'var(--font-sans)', fontSize: 15, fontWeight: 600,
              color: 'var(--paper)', textDecoration: 'none',
            }}
          >
            Browse episodes
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  )
}
