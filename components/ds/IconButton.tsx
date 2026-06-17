'use client'

import { useState } from 'react'
import type { ReactNode, CSSProperties } from 'react'

type IconButtonProps = {
  children: ReactNode
  variant?: 'ghost' | 'secondary' | 'accent' | 'inverse'
  size?: 'sm' | 'md' | 'lg'
  label?: string
  disabled?: boolean
  onClick?: () => void
  style?: CSSProperties
}

export function IconButton({ children, variant = 'ghost', size = 'md', label, disabled = false, onClick, style }: IconButtonProps) {
  const [hover, setHover] = useState(false)

  const sizes = { sm: 32, md: 38, lg: 46 }
  const dim = sizes[size]

  const variants = {
    ghost:     { background: hover ? 'var(--surface-sunken)' : 'transparent', color: 'var(--text-body)', borderColor: 'transparent' },
    secondary: { background: hover ? 'var(--surface-sunken)' : 'transparent', color: 'var(--text-strong)', borderColor: 'var(--border-strong)' },
    accent:    { background: hover ? 'var(--accent-hover)' : 'var(--accent)', color: 'var(--text-on-accent)', borderColor: 'transparent' },
    inverse:   { background: hover ? 'rgba(255,255,255,0.10)' : 'transparent', color: 'var(--text-on-dark)', borderColor: 'transparent' },
  }

  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: dim,
        height: dim,
        flex: `0 0 ${dim}px`,
        borderRadius: 'var(--radius-sm)',
        border: '1px solid transparent',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.4 : 1,
        transition: 'background 120ms ease-out, color 120ms ease-out',
        ...variants[variant],
        ...style,
      }}
    >
      {children}
    </button>
  )
}
