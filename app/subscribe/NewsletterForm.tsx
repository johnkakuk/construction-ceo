'use client'

export default function NewsletterForm() {
  return (
    <form style={{ display: 'flex', gap: 10, maxWidth: 440 }} onSubmit={(e) => e.preventDefault()}>
      <input
        type="email"
        placeholder="you@firm.com"
        style={{
          flex: 1, height: 40, padding: '0 14px',
          fontFamily: 'var(--font-sans)', fontSize: 14, color: 'var(--text-strong)',
          background: 'var(--surface-card)', border: '1px solid var(--border)',
          borderRadius: 'var(--radius-sm)', outline: 'none',
        }}
      />
      <button
        type="submit"
        style={{
          height: 40, padding: '0 18px',
          borderRadius: 'var(--radius-sm)', border: 'none',
          background: 'var(--accent)', color: 'var(--ink-950)',
          fontFamily: 'var(--font-sans)', fontSize: 14, fontWeight: 600,
          cursor: 'pointer', whiteSpace: 'nowrap',
        }}
      >
        Subscribe
      </button>
    </form>
  )
}
