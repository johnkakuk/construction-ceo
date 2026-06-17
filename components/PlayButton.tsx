'use client'

import { useState } from 'react'

type PlayButtonProps = {
  playing?: boolean
  size?: number
  variant?: 'solid' | 'outline' | 'inverse'
  label?: string
  onToggle?: (e: React.MouseEvent) => void
  onClick?: (e: React.MouseEvent) => void
}

export default function PlayButton({
  playing = false,
  size = 56,
  variant = 'solid',
  label,
  onToggle,
  onClick,
}: PlayButtonProps) {
  const [hover, setHover] = useState(false)

  const handle = (e: React.MouseEvent) => {
    onToggle?.(e)
    onClick?.(e)
  }

  const variantStyles = {
    solid: {
      background: hover ? 'var(--accent-hover)' : 'var(--accent)',
      color: 'var(--ink-950)',
      border: 'none',
      boxShadow: 'var(--shadow-sm)',
    },
    outline: {
      background: hover ? 'var(--surface-sunken)' : 'var(--surface-raised)',
      color: 'var(--ink-900)',
      border: '1.5px solid var(--border-strong)',
      boxShadow: 'none',
    },
    inverse: {
      background: hover ? 'var(--paper-0)' : 'var(--paper-50)',
      color: 'var(--ink-950)',
      border: 'none',
      boxShadow: 'none',
    },
  }

  const glyph = size * 0.4

  return (
    <button
      type="button"
      aria-label={label || (playing ? 'Pause' : 'Play')}
      onClick={handle}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: size,
        height: size,
        flex: `0 0 ${size}px`,
        borderRadius: '50%',
        cursor: 'pointer',
        transition: 'background var(--dur-fast, 120ms) ease-out, transform var(--dur-fast, 120ms) ease-out',
        transform: hover ? 'scale(1.03)' : 'scale(1)',
        ...variantStyles[variant],
      }}
    >
      {playing ? (
        <svg width={glyph} height={glyph} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <rect x="5" y="3" width="5" height="18" rx="1" />
          <rect x="14" y="3" width="5" height="18" rx="1" />
        </svg>
      ) : (
        <svg width={glyph} height={glyph} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ marginLeft: size * 0.04 }}>
          <path d="M6 4.5v15a1 1 0 0 0 1.5.87l12.5-7.5a1 1 0 0 0 0-1.74L7.5 3.63A1 1 0 0 0 6 4.5Z" />
        </svg>
      )}
    </button>
  )
}
