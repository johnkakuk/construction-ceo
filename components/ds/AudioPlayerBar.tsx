'use client'

import { useRef, useState } from 'react'
import { Waveform } from './Waveform'
import { Timestamp } from './Timestamp'
import { IconButton } from './IconButton'
import { MarqueeText } from './MarqueeText'
import PlayButton from '@/components/PlayButton'
import type { CSSProperties } from 'react'

const Back = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M11 17l-5-5 5-5M18 17l-5-5 5-5" />
  </svg>
)
const Fwd = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 17l5-5-5-5M6 17l5-5-5-5" />
  </svg>
)

type AudioPlayerBarProps = {
  title?: string
  guest?: string
  cover?: string
  playing?: boolean
  currentSeconds?: number
  durationSeconds?: number
  onToggle?: () => void
  onSeek?: (progress: number) => void
  speed?: string
  onSpeed?: () => void
  style?: CSSProperties
}

export function AudioPlayerBar({
  title,
  guest,
  cover,
  playing = false,
  currentSeconds = 0,
  durationSeconds = 1,
  onToggle,
  onSeek,
  speed = '1.0×',
  onSpeed,
  style,
}: AudioPlayerBarProps) {
  const progress = Math.min(1, currentSeconds / (durationSeconds || 1))
  const trackRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  function seekFromPointer(e: React.PointerEvent) {
    const el = trackRef.current
    if (!el || !onSeek) return
    const rect = el.getBoundingClientRect()
    onSeek(Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width)))
  }

  function handlePointerDown(e: React.PointerEvent) {
    e.currentTarget.setPointerCapture(e.pointerId)
    setIsDragging(true)
    seekFromPointer(e)
  }

  function handlePointerMove(e: React.PointerEvent) {
    if (!isDragging) return
    seekFromPointer(e)
  }

  function handlePointerUp(e: React.PointerEvent) {
    setIsDragging(false)
    seekFromPointer(e)
  }

  return (
    <div className="cc-player-bar" style={{
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      padding: '12px 20px',
      background: 'var(--surface-card)',
      borderTop: '1px solid var(--border)',
      boxShadow: 'var(--shadow-lg)',
      ...style,
    }}>
      {/* Mobile-only progress scrubber */}
      <div
        ref={trackRef}
        className="cc-player-progress-line"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 12, cursor: 'pointer' }}
      >
        {/* Track */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'var(--border)' }}>
          {/* Fill */}
          <div style={{ height: '100%', width: `${progress * 100}%`, background: 'var(--accent)', transition: isDragging ? 'none' : 'width 1s linear' }} />
        </div>
        {/* Thumb */}
        <div style={{
          position: 'absolute',
          top: 1,
          left: `${progress * 100}%`,
          transform: 'translate(-50%, -50%)',
          width: 10, height: 10,
          borderRadius: '50%',
          background: 'var(--accent)',
          pointerEvents: 'none',
        }} />
      </div>

      {/* Info — fixed basis, right cluster takes all remaining space */}
      <div className="cc-player-info" style={{ display: 'flex', alignItems: 'center', gap: 12, flex: '0 0 220px', minWidth: 0 }}>
        <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-sm)', overflow: 'hidden', background: 'var(--ink-800)', flexShrink: 0 }}>
          {cover && <img src={cover} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
        </div>
        <div style={{ minWidth: 0, flex: 1 }}>
          <MarqueeText fadeColor="var(--surface-card)" style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-strong)' }}>{title ?? ''}</MarqueeText>
          <MarqueeText fadeColor="var(--surface-card)" style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)' }}>{guest ?? ''}</MarqueeText>
        </div>
      </div>

      {/* Right cluster: transport + scrubber + speed */}
      <div className="cc-player-right" style={{ display: 'flex', alignItems: 'center', gap: 18, flex: 1, minWidth: 0 }}>
        {/* Transport */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span className="cc-player-skip"><IconButton label="Back 15s" size="sm"><Back /></IconButton></span>
          <PlayButton playing={playing} onToggle={onToggle ? (e) => { e.stopPropagation(); onToggle() } : undefined} size={46} />
          <span className="cc-player-skip"><IconButton label="Forward 15s" size="sm"><Fwd /></IconButton></span>
        </div>

        {/* Scrubber */}
        <div className="cc-player-scrubber" style={{ display: 'flex', alignItems: 'center', gap: 12, flex: 1, minWidth: 0 }}>
          <Timestamp seconds={currentSeconds} />
          <Waveform progress={progress} bars={80} height={34} onSeek={onSeek} style={{ flex: 1 }} />
          <Timestamp seconds={durationSeconds} />
        </div>

        {/* Speed */}
        <button
          type="button"
          onClick={onSpeed}
          className="cc-player-speed"
          style={{
            height: 32,
            padding: '0 10px',
            fontFamily: 'var(--font-mono)',
            fontSize: 12,
            fontWeight: 600,
            color: 'var(--text-muted)',
            background: 'var(--surface-sunken)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)',
            cursor: 'pointer',
          }}
        >
          {speed}
        </button>
      </div>
    </div>
  )
}
