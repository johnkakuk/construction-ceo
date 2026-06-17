'use client'

import { useState } from 'react'
import type { ReactNode, CSSProperties } from 'react'

type TagProps = {
  children: ReactNode
  active?: boolean
  onClick?: () => void
  style?: CSSProperties
}

export function Tag({ children, active = false, onClick, style }: TagProps) {
  const [hover, setHover] = useState(false)

  const activeStyle = {
    color: 'var(--text-on-accent)',
    background: 'var(--accent)',
    borderColor: 'var(--accent)',
  }
  const restingStyle = {
    color: 'var(--text-body)',
    background: 'transparent',
    borderColor: 'var(--border-strong)',
  }
  const hoverStyle = onClick && !active ? { background: 'var(--surface-sunken)', borderColor: 'var(--steel-400)' } : {}

  return (
    <span
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        height: 28,
        padding: '0 12px',
        fontFamily: 'var(--font-sans)',
        fontSize: 'var(--text-2xs)',
        fontWeight: 'var(--weight-medium)',
        letterSpacing: '0.01em',
        lineHeight: 1,
        borderRadius: 'var(--radius-pill)',
        border: '1px solid',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'background var(--dur-fast, 120ms) ease-out, border-color var(--dur-fast, 120ms) ease-out, color var(--dur-fast, 120ms) ease-out',
        ...(active ? activeStyle : restingStyle),
        ...(hover ? hoverStyle : {}),
        ...style,
      }}
    >
      {children}
    </span>
  )
}
