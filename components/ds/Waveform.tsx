'use client'

import { useMemo } from 'react'
import type { CSSProperties } from 'react'

type WaveformProps = {
  progress?: number
  bars?: number
  height?: number
  playedColor?: string
  trackColor?: string
  onSeek?: (progress: number) => void
  style?: CSSProperties
}

export function Waveform({
  progress = 0.32,
  bars = 64,
  height = 48,
  playedColor = 'var(--accent)',
  trackColor = 'var(--concrete-200)',
  onSeek,
  style,
}: WaveformProps) {
  const heights = useMemo(() => {
    const out: number[] = []
    for (let i = 0; i < bars; i++) {
      const v = Math.abs(Math.sin(i * 12.9898) * 43758.5453)
      const frac = v - Math.floor(v)
      const env = 0.45 + 0.55 * Math.sin((i / bars) * Math.PI)
      out.push(0.25 + frac * 0.75 * env)
    }
    return out
  }, [bars])

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onSeek) return
    const rect = e.currentTarget.getBoundingClientRect()
    onSeek(Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width)))
  }

  return (
    <div
      onClick={handleClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        height,
        cursor: onSeek ? 'pointer' : 'default',
        ...style,
      }}
    >
      {heights.map((h, i) => {
        const played = i / bars <= progress
        return (
          <span
            key={i}
            style={{
              flex: 1,
              height: `${Math.round(h * 100)}%`,
              minWidth: 2,
              borderRadius: 'var(--radius-xs)',
              background: played ? playedColor : trackColor,
              transition: 'background 120ms ease-out',
            }}
          />
        )
      })}
    </div>
  )
}
