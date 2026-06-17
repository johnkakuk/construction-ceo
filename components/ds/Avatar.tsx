'use client'

import type { CSSProperties } from 'react'

type AvatarProps = {
  src?: string
  name?: string
  size?: number
  shape?: 'square' | 'rounded' | 'circle'
  duotone?: boolean
  style?: CSSProperties
}

export function Avatar({ src, name = '', size = 48, shape = 'square', duotone = false, style }: AvatarProps) {
  const initials = name
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const radius = shape === 'circle' ? '50%' : shape === 'rounded' ? 'var(--radius-md)' : 'var(--radius-sm)'

  return (
    <div
      title={name || undefined}
      style={{
        position: 'relative',
        width: size,
        height: size,
        flex: `0 0 ${size}px`,
        borderRadius: radius,
        overflow: 'hidden',
        background: 'var(--ink-700)',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        ...style,
      }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={name}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            filter: duotone ? 'grayscale(1) contrast(1.05) brightness(0.95)' : 'none',
          }}
        />
      ) : (
        <span style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 'var(--weight-bold)',
          fontSize: Math.max(11, size * 0.36),
          letterSpacing: '-0.02em',
          color: 'var(--paper-50)',
        }}>
          {initials}
        </span>
      )}
      {duotone && src ? (
        <span style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(160deg, rgba(225,175,34,0.28), rgba(22,20,15,0.42))',
          mixBlendMode: 'multiply',
        }} />
      ) : null}
    </div>
  )
}
