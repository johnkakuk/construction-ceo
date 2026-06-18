'use client'

import { useMemo, useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'

const BAR_UNIT = 5 // 3px bar + 2px gap

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
  const containerRef = useRef<HTMLDivElement>(null)
  const [barCount, setBarCount] = useState(bars)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    function measure() {
      if (el) setBarCount(Math.max(5, Math.floor(el.clientWidth / BAR_UNIT)))
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  const heights = useMemo(() => {
    const out: number[] = []
    for (let i = 0; i < barCount; i++) {
      const v = Math.abs(Math.sin(i * 12.9898) * 43758.5453)
      const frac = v - Math.floor(v)
      const env = 0.45 + 0.55 * Math.sin((i / barCount) * Math.PI)
      out.push(0.25 + frac * 0.75 * env)
    }
    return out
  }, [barCount])

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!onSeek) return
    const rect = e.currentTarget.getBoundingClientRect()
    onSeek(Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width)))
  }

  return (
    <div
      ref={containerRef}
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
        const played = i / barCount <= progress
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
