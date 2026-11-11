import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Reproductor de audio propio. `play()` hay que llamarlo dentro de un toque
 * (por ejemplo, al abrir el sobre): así los navegadores, incluido Safari en
 * iPhone, dejan que la música suene con volumen.
 */
export function useSongAudio(src: string, meta?: { title: string; artist?: string }) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [blocked, setBlocked] = useState(false)
  const [ended, setEnded] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)

  useEffect(() => {
    const audio = new Audio(src)
    audio.preload = 'auto'
    audioRef.current = audio

    const onPlay = () => {
      setPlaying(true)
      setBlocked(false)
      setEnded(false)
    }
    const onPause = () => setPlaying(false)
    const onEnded = () => {
      setPlaying(false)
      setEnded(true)
    }
    const onTime = () => setTime(audio.currentTime)
    const onDuration = () => setDuration(Number.isFinite(audio.duration) ? audio.duration : 0)

    audio.addEventListener('play', onPlay)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('ended', onEnded)
    audio.addEventListener('timeupdate', onTime)
    audio.addEventListener('loadedmetadata', onDuration)
    audio.addEventListener('durationchange', onDuration)

    return () => {
      audio.pause()
      audio.removeEventListener('play', onPlay)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('ended', onEnded)
      audio.removeEventListener('timeupdate', onTime)
      audio.removeEventListener('loadedmetadata', onDuration)
      audio.removeEventListener('durationchange', onDuration)
      if (audioRef.current === audio) audioRef.current = null
    }
  }, [src])

  // Título en la pantalla de bloqueo / centro de control del celular.
  useEffect(() => {
    if (!meta || !('mediaSession' in navigator) || typeof MediaMetadata === 'undefined') return
    navigator.mediaSession.metadata = new MediaMetadata({ title: meta.title, artist: meta.artist })
  }, [meta?.title, meta?.artist])

  const play = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.play().catch(() => setBlocked(true))
  }, [])

  const toggle = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) play()
    else audio.pause()
  }, [play])

  const seek = useCallback((seconds: number) => {
    const audio = audioRef.current
    if (!audio) return
    audio.currentTime = seconds
    setTime(seconds)
  }, [])

  return { playing, blocked, ended, time, duration, play, toggle, seek }
}

export type SongAudio = ReturnType<typeof useSongAudio>
