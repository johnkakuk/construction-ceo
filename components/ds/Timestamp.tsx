'use client'

import { useState } from 'react'
import type { ReactNode, CSSProperties } from 'react'

type TimestampProps = {
  seconds?: number
  children?: ReactNode
  variant?: 'plain' | 'chip' | 'link'
  onClick?: () => void
  style?: CSSProperties
}

function fmt(s: number): string {
  s = Math.max(0, Math.round(s))
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  const pad = (n: number) => String(n).padStart(2, '0')
  return h > 0 ? `${h}:${pad(m)}:${pad(sec)}` : `${m}:${pad(sec)}`
}

export function Timestamp({ seconds, children, variant = 'plain', onClick, style }: TimestampProps) {
  const [hover, setHover] = useState(false)
  const label = seconds !== undefined && seconds !== null ? fmt(seconds) : children

  const base: CSSProperties = {
    fontFamily: 'var(--font-mono)',
    fontSize: 'var(--text-2xs)',
    fontWeight: 'var(--weight-medium)',
    letterSpacing: '0.02em',
    fontVariantNumeric: 'tabular-nums',
    lineHeight: 1,
  }

  if (variant === 'chip') {
    return (
      <span style={{ ...base, display: 'inline-flex', alignItems: 'center', height: 20, padding: '0 7px', borderRadius: 'var(--radius-xs)', background: 'var(--surface-sunken)', border: '1px solid var(--border)', color: 'var(--text-muted)', ...style }}>
        {label}
      </span>
    )
  }

  if (onClick || variant === 'link') {
    return (
      <button
        type="button"
        onClick={onClick}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{ ...base, appearance: 'none', border: 'none', background: 'none', cursor: 'pointer', padding: 0, color: hover ? 'var(--ochre-600)' : 'var(--ochre-700)', ...style }}
      >
        {label}
      </button>
    )
  }

  return <span style={{ ...base, color: 'var(--text-muted)', ...style }}>{label}</span>
}
