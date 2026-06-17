'use client'

import { createContext, useContext, useState, useRef, useEffect } from 'react'
import { AudioPlayerBar } from '@/components/ds/AudioPlayerBar'
import type { Episode } from '@/lib/data'

type AudioContextValue = {
  playingSlug: string | null
  playing: boolean
  hasPlayed: boolean
  currentTime: number
  duration: number
  toggle: (episode: Episode) => void
  seek: (fraction: number) => void
  playFrom: (episode: Episode, seconds: number) => void
}

const AudioContext = createContext<AudioContextValue | null>(null)

export function useAudio() {
  const ctx = useContext(AudioContext)
  if (!ctx) throw new Error('useAudio must be used within AudioProvider')
  return ctx
}

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [playingSlug, setPlayingSlug] = useState<string | null>(null)
  const [hasPlayed, setHasPlayed] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [barEpisode, setBarEpisode] = useState<Episode | null>(null)

  const audioRef = useRef<HTMLAudioElement | null>(null)
  const durationRef = useRef(0)
  const pendingSeekRef = useRef<number | null>(null)

  useEffect(() => {
    const audio = new Audio()
    audio.preload = 'metadata'
    audio.addEventListener('timeupdate', () => setCurrentTime(audio.currentTime))
    audio.addEventListener('loadedmetadata', () => {
      durationRef.current = audio.duration
      setDuration(audio.duration)
      // Apply any seek that was requested before the audio was ready
      if (pendingSeekRef.current !== null) {
        audio.currentTime = pendingSeekRef.current
        setCurrentTime(pendingSeekRef.current)
        pendingSeekRef.current = null
      }
    })
    audio.addEventListener('ended', () => setPlayingSlug(null))
    audioRef.current = audio
    return () => { audio.pause(); audio.src = '' }
  }, [])

  const playing = playingSlug !== null

  function toggle(episode: Episode) {
    const audio = audioRef.current
    if (!audio) return

    if (playingSlug === episode.slug) {
      audio.pause()
      setPlayingSlug(null)
      return
    }

    if (audio.getAttribute('data-slug') !== episode.slug) {
      audio.src = episode.audioUrl ?? ''
      audio.setAttribute('data-slug', episode.slug)
      setCurrentTime(0)
      setDuration(0)
      durationRef.current = 0
    }

    setBarEpisode(episode)
    setPlayingSlug(episode.slug)
    setHasPlayed(true)
    audio.play().catch(() => {})
  }

  function seek(fraction: number) {
    const audio = audioRef.current
    if (!audio) return
    const target = fraction * durationRef.current
    audio.currentTime = target
    setCurrentTime(target)
  }

  // Start playing an episode at a specific second. If the episode is already
  // loaded, seeks immediately. If it's a new episode, queues the seek to fire
  // once loadedmetadata fires.
  function playFrom(episode: Episode, seconds: number) {
    const audio = audioRef.current
    if (!audio) return

    if (audio.getAttribute('data-slug') === episode.slug) {
      // Same episode already loaded — seek directly
      audio.currentTime = seconds
      setCurrentTime(seconds)
      if (playingSlug !== episode.slug) {
        setPlayingSlug(episode.slug)
        audio.play().catch(() => {})
      }
    } else {
      // New episode — queue the seek for after loadedmetadata
      pendingSeekRef.current = seconds
      audio.src = episode.audioUrl ?? ''
      audio.setAttribute('data-slug', episode.slug)
      setCurrentTime(0)
      setDuration(0)
      durationRef.current = 0
      setBarEpisode(episode)
      setPlayingSlug(episode.slug)
      setHasPlayed(true)
      audio.play().catch(() => {})
    }
  }

  function handleBarToggle() {
    const audio = audioRef.current
    if (!audio || !barEpisode) return
    if (playing) {
      audio.pause()
      setPlayingSlug(null)
    } else {
      audio.play().catch(() => {})
      setPlayingSlug(barEpisode.slug)
    }
  }

  return (
    <AudioContext.Provider value={{ playingSlug, playing, hasPlayed, currentTime, duration, toggle, seek, playFrom }}>
      <div style={{ paddingBottom: hasPlayed ? 78 : 0 }}>
        {children}
      </div>
      {hasPlayed && barEpisode && (
        <div style={{ position: 'fixed', left: 0, right: 0, bottom: 0, zIndex: 40 }}>
          <AudioPlayerBar
            title={barEpisode.title}
            guest={`${barEpisode.guestName ?? ''}${barEpisode.guestCompany ? ' · ' + barEpisode.guestCompany : ''}`}
            cover={barEpisode.featuredImage?.url}
            playing={playing}
            currentSeconds={currentTime}
            durationSeconds={duration || 1}
            onToggle={handleBarToggle}
            onSeek={seek}
            speed="1.0×"
          />
        </div>
      )}
    </AudioContext.Provider>
  )
}
