import React, { useCallback, useRef, useState } from 'react'
import { set, unset, useClient } from 'sanity'
import type { StringInputProps } from 'sanity'
import type { SanityAssetDocument } from '@sanity/client'

export function AudioUploadInput(props: StringInputProps) {
  const { value, onChange, elementProps } = props
  const client = useClient({ apiVersion: '2024-01-01' })
  const [uploading, setUploading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [error, setError] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback(
    (file: File) => {
      setUploading(true)
      setProgress(0)
      setError(null)

      const subscription = client.observable.assets
        .upload('file', file, { filename: file.name, contentType: file.type })
        .subscribe({
          next: (event) => {
            if (event.type === 'progress' && event.percent != null) {
              setProgress(Math.round(event.percent))
            } else if (event.type === 'response') {
              const body = event.body as { document: SanityAssetDocument }
              onChange(set(body.document.url))
              setUploading(false)
              setProgress(100)
            }
          },
          error: (err: unknown) => {
            setError(err instanceof Error ? err.message : 'Upload failed.')
            setUploading(false)
          },
        })

      return () => subscription.unsubscribe()
    },
    [client, onChange],
  )

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {/* URL text input — paste a URL or see the result after upload */}
      <div style={{ display: 'flex', gap: 6 }}>
        <input
          {...elementProps}
          type="url"
          value={value ?? ''}
          placeholder="https://… or upload a file below"
          onChange={(e) => onChange(e.target.value ? set(e.target.value) : unset())}
          style={{
            flex: 1,
            height: 35,
            padding: '0 10px',
            border: '1px solid var(--card-border-color)',
            borderRadius: 3,
            background: 'var(--card-bg2-color)',
            color: 'var(--card-fg-color)',
            fontSize: 13,
            fontFamily: 'inherit',
            outline: 'none',
          }}
        />
        {value && (
          <button
            type="button"
            onClick={() => onChange(unset())}
            style={{
              height: 35,
              padding: '0 12px',
              border: '1px solid var(--card-border-color)',
              borderRadius: 3,
              background: 'transparent',
              color: 'var(--card-muted-fg-color)',
              cursor: 'pointer',
              fontSize: 12,
              fontFamily: 'inherit',
            }}
          >
            Clear
          </button>
        )}
      </div>

      {/* Upload button + progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <button
          type="button"
          disabled={uploading}
          onClick={() => fileRef.current?.click()}
          style={{
            height: 33,
            padding: '0 14px',
            border: '1px solid var(--card-border-color)',
            borderRadius: 3,
            background: 'transparent',
            color: 'var(--card-fg-color)',
            cursor: uploading ? 'not-allowed' : 'pointer',
            fontSize: 13,
            fontFamily: 'inherit',
            display: 'flex',
            alignItems: 'center',
            gap: 7,
            opacity: uploading ? 0.6 : 1,
          }}
        >
          <UploadIcon />
          {uploading ? `Uploading… ${progress}%` : 'Upload audio file'}
        </button>

        {uploading && (
          <div style={{ flex: 1, maxWidth: 200, height: 4, borderRadius: 2, background: 'var(--card-border-color)' }}>
            <div
              style={{
                height: '100%',
                borderRadius: 2,
                background: 'var(--blue-500, #3b82f6)',
                width: `${progress}%`,
                transition: 'width 0.2s ease',
              }}
            />
          </div>
        )}

        {error && (
          <span style={{ fontSize: 12, color: 'var(--red-500, #c00)' }}>{error}</span>
        )}

        <input
          ref={fileRef}
          type="file"
          accept="audio/*"
          hidden
          onChange={(e) => {
            const f = e.target.files?.[0]
            if (f) handleFile(f)
            // reset so the same file can be re-selected after clearing
            e.target.value = ''
          }}
        />
      </div>
    </div>
  )
}

function UploadIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  )
}
