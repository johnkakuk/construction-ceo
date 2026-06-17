'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import Fuse from 'fuse.js'
import { MarqueeText } from './ds/MarqueeText'

type EpisodeIndex = {
  slug: string
  title: string
  guestName?: string
  guestTitle?: string
  guestCompany?: string
  summary?: string
  duration?: string
}

type Props = {
  open: boolean
  onClose: () => void
}

let cachedIndex: EpisodeIndex[] | null = null

export default function SearchModal({ open, onClose }: Props) {
  const router = useRouter()
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)
  const [query, setQuery] = useState('')
  const [index, setIndex] = useState<EpisodeIndex[]>(cachedIndex ?? [])
  const [results, setResults] = useState<EpisodeIndex[]>([])
  const [cursor, setCursor] = useState(0)

  // Load index once on first open
  useEffect(() => {
    if (!open) return
    if (cachedIndex) { setIndex(cachedIndex); return }
    fetch('/api/search-index')
      .then((r) => r.json())
      .then((data: EpisodeIndex[]) => {
        cachedIndex = data
        setIndex(data)
      })
  }, [open])

  // Focus input when modal opens
  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 30)
      setQuery('')
      setResults([])
      setCursor(0)
    }
  }, [open])

  // Run search whenever query or index changes
  useEffect(() => {
    if (!query.trim()) { setResults([]); setCursor(0); return }
    const fuse = new Fuse(index, {
      keys: [
        { name: 'title', weight: 3 },
        { name: 'guestName', weight: 2 },
        { name: 'guestCompany', weight: 1 },
        { name: 'summary', weight: 0.8 },
      ],
      threshold: 0.35,
      minMatchCharLength: 2,
    })
    const hits = fuse.search(query).slice(0, 8).map((r) => r.item)
    setResults(hits)
    setCursor(0)
  }, [query, index])

  // Close on backdrop click or ESC
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Escape') { onClose(); return }
      if (e.key === 'ArrowDown') { e.preventDefault(); setCursor((c) => Math.min(c + 1, results.length - 1)) }
      if (e.key === 'ArrowUp') { e.preventDefault(); setCursor((c) => Math.max(c - 1, 0)) }
      if (e.key === 'Enter' && results[cursor]) {
        onClose()
        router.push(`/podcast/${results[cursor].slug}`)
      }
    },
    [results, cursor, onClose, router],
  )

  // Scroll active result into view
  useEffect(() => {
    const el = listRef.current?.children[cursor] as HTMLElement | undefined
    el?.scrollIntoView({ block: 'nearest' })
  }, [cursor])

  if (!open) return null

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 50,
        display: 'flex', alignItems: 'flex-start', justifyContent: 'center',
        paddingTop: 'clamp(60px, 12vh, 120px)',
        background: 'rgba(15,14,11,0.72)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%', maxWidth: 600, margin: '0 28px',
          background: 'var(--surface-card)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 24px 64px rgba(15,14,11,0.28), 0 4px 16px rgba(15,14,11,0.12)',
          overflow: 'hidden',
        }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Input row */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '0 16px', borderBottom: '1px solid var(--border-soft)' }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
            <circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search episodes, guests…"
            style={{
              flex: 1, height: 52, border: 'none', outline: 'none', background: 'transparent',
              fontFamily: 'var(--font-sans)', fontSize: 16, color: 'var(--text-strong)',
            }}
          />
          <kbd style={{
            flexShrink: 0, padding: '2px 6px', borderRadius: 4,
            border: '1px solid var(--border)', background: 'var(--surface-sunken)',
            fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-muted)',
          }}>
            ESC
          </kbd>
        </div>

        {/* Results */}
        {results.length > 0 && (
          <ul ref={listRef} style={{ listStyle: 'none', margin: 0, padding: '6px 0', maxHeight: 420, overflowY: 'auto' }}>
            {results.map((ep, i) => {
              const active = i === cursor
              const role = [ep.guestTitle, ep.guestCompany].filter(Boolean).join(' · ')
              return (
                <li key={ep.slug}>
                  <button
                    type="button"
                    onMouseEnter={() => setCursor(i)}
                    onClick={() => { onClose(); router.push(`/podcast/${ep.slug}`) }}
                    style={{
                      width: '100%', textAlign: 'left', cursor: 'pointer', border: 'none',
                      display: 'flex', alignItems: 'center', gap: 14,
                      padding: '10px 16px',
                      background: active ? 'var(--surface-sunken)' : 'transparent',
                      transition: 'background 80ms ease-out',
                    }}
                  >
                    <div style={{
                      flexShrink: 0, width: 32, height: 32, borderRadius: 'var(--radius-sm)',
                      background: active ? 'var(--accent)' : 'var(--surface-sunken)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      transition: 'background 80ms ease-out',
                    }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill={active ? 'var(--ink-950)' : 'var(--text-muted)'}>
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <MarqueeText style={{ fontWeight: 600, fontSize: 14, color: 'var(--text-strong)' }}>
                        {ep.title}
                      </MarqueeText>
                      {(ep.guestName || role) && (
                        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 1 }}>
                          {ep.guestName}{role ? ` · ${role}` : ''}
                        </div>
                      )}
                    </div>
                    {ep.duration && (
                      <span style={{ flexShrink: 0, fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-faint)' }}>
                        {ep.duration}
                      </span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        )}

        {/* Empty state */}
        {query.trim().length >= 2 && results.length === 0 && (
          <div style={{ padding: '28px 16px', textAlign: 'center', color: 'var(--text-muted)', fontSize: 14 }}>
            No episodes found for &ldquo;{query}&rdquo;
          </div>
        )}

        {/* Footer hint */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 16, padding: '8px 16px',
          borderTop: results.length > 0 || (query.trim().length >= 2) ? '1px solid var(--border-soft)' : undefined,
        }}>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--text-faint)' }}>
            ↑↓ navigate · ↵ open · esc close
          </span>
        </div>
      </div>
    </div>
  )
}
