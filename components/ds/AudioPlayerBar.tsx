'use client'

import { Waveform } from './Waveform'
import { Timestamp } from './Timestamp'
import { IconButton } from './IconButton'
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

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: 18,
      padding: '12px 20px',
      background: 'var(--surface-card)',
      borderTop: '1px solid var(--border)',
      boxShadow: 'var(--shadow-lg)',
      ...style,
    }}>
      {/* Now playing */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, width: 240, flex: '0 0 auto', minWidth: 0 }}>
        <div style={{ width: 44, height: 44, borderRadius: 'var(--radius-sm)', overflow: 'hidden', background: 'var(--ink-800)', flex: '0 0 auto' }}>
          {cover && <img src={cover} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />}
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-strong)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{title}</div>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{guest}</div>
        </div>
      </div>

      {/* Transport */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, flex: '0 0 auto' }}>
        <IconButton label="Back 15s" size="sm"><Back /></IconButton>
        <PlayButton playing={playing} onToggle={onToggle ? (e) => { e.stopPropagation(); onToggle() } : undefined} size={46} />
        <IconButton label="Forward 15s" size="sm"><Fwd /></IconButton>
      </div>

      {/* Scrubber */}
      <div style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 12, minWidth: 0 }}>
        <Timestamp seconds={currentSeconds} />
        <Waveform progress={progress} bars={80} height={34} onSeek={onSeek} style={{ flex: 1 }} />
        <Timestamp seconds={durationSeconds} />
      </div>

      {/* Speed */}
      <button
        type="button"
        onClick={onSpeed}
        style={{
          flex: '0 0 auto',
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
  )
}
