'use client'

import type { CSSProperties } from 'react'

type TabItem = { id: string; label: string; badge?: string | number }

type TabsProps = {
  value: string
  onChange: (id: string) => void
  items: TabItem[]
  style?: CSSProperties
}

export function Tabs({ value, onChange, items, style }: TabsProps) {
  return (
    <div style={{ display: 'flex', borderBottom: '1px solid var(--border)', ...style }}>
      {items.map((item) => {
        const active = value === item.id
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              padding: '0 4px',
              marginRight: 24,
              marginBottom: -1,
              height: 42,
              background: 'none',
              border: 'none',
              borderBottom: `2px solid ${active ? 'var(--accent)' : 'transparent'}`,
              fontFamily: 'var(--font-sans)',
              fontSize: 14,
              fontWeight: active ? 600 : 500,
              color: active ? 'var(--text-strong)' : 'var(--text-muted)',
              cursor: 'pointer',
              transition: 'color 120ms ease-out, border-color 120ms ease-out',
              whiteSpace: 'nowrap',
            }}
          >
            {item.label}
            {item.badge !== undefined && (
              <span style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 10,
                fontWeight: 600,
                letterSpacing: '0.04em',
                padding: '2px 6px',
                borderRadius: 'var(--radius-pill)',
                background: active ? 'var(--accent)' : 'var(--surface-sunken)',
                color: active ? 'var(--text-on-accent)' : 'var(--text-muted)',
                transition: 'background 120ms ease-out, color 120ms ease-out',
              }}>
                {item.badge}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}
