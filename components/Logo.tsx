import Link from 'next/link'
import type { CSSProperties, ReactNode } from 'react'

type LogoProps = {
  href?: string
  tone?: 'auto' | 'light' | 'dark'
  variant?: 'lockup' | 'monogram' | 'wordmark'
  size?: number
  style?: CSSProperties
}

export default function Logo({ href, tone = 'auto', variant = 'lockup', size = 40, style }: LogoProps) {
  const onDark = tone === 'dark'
  const wordColor = onDark ? 'var(--paper-50)' : 'var(--ink-900)'

  const Monogram = (
    <span style={{
      position: 'relative',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: size,
      height: size,
      background: 'var(--ink-900)',
      borderRadius: 'var(--radius-sm)',
      flex: `0 0 ${size}px`,
      overflow: 'hidden',
    }}>
      <span style={{
        fontFamily: 'var(--font-display)',
        fontWeight: 900,
        fontSize: size * 0.52,
        letterSpacing: '-0.07em',
        lineHeight: 1,
        display: 'inline-flex',
        marginBottom: size * 0.08,
      }}>
        <span style={{ color: 'var(--paper-50)' }}>C</span>
        <span style={{ color: 'var(--accent)' }}>C</span>
      </span>
      <span style={{
        position: 'absolute',
        left: size * 0.2,
        right: size * 0.2,
        bottom: size * 0.16,
        height: Math.max(2, size * 0.05),
        background: 'var(--accent)',
      }} />
    </span>
  )

  const Wordmark = (
    <span style={{
      fontFamily: 'var(--font-display)',
      fontWeight: 900,
      fontSize: size * 0.6,
      lineHeight: 1,
      letterSpacing: '-0.025em',
      color: wordColor,
      whiteSpace: 'nowrap',
    }}>
      CONSTRUCTION CEO<span style={{ color: 'var(--accent)' }}>.</span>
    </span>
  )

  let content: ReactNode
  if (variant === 'monogram') {
    content = <span role="img" aria-label="Construction CEO" style={{ display: 'inline-flex', ...style }}>{Monogram}</span>
  } else if (variant === 'wordmark') {
    content = <span role="img" aria-label="Construction CEO" style={{ display: 'inline-flex', alignItems: 'center', ...style }}>{Wordmark}</span>
  } else {
    content = (
      <span role="img" aria-label="Construction CEO" style={{ display: 'inline-flex', alignItems: 'center', gap: size * 0.3, ...style }}>
        {Monogram}
        {Wordmark}
      </span>
    )
  }

  if (!href) return content

  return (
    <Link href={href} aria-label="Construction CEO home" style={{ display: 'inline-flex', alignItems: 'center', textDecoration: 'none' }}>
      {content}
    </Link>
  )
}
