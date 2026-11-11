import { useEffect, useRef, useState } from 'react'
import { content } from '../content'

const YT_ORIGIN = /^https:\/\/www\.youtube(-nocookie)?\.com$/

export function Song() {
  const { label, title, phrase, videoId, fallbackLink, playHint } = content.song
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [playing, setPlaying] = useState(false)

  // El iframe se monta recién al abrir el sobre: ese toque cuenta como interacción,
  // así que probamos con autoplay. Si el navegador lo bloquea, queda el reproductor
  // para darle play, con un aviso que desaparece cuando el video empieza a sonar.
  const origin = typeof window !== 'undefined' ? window.location.origin : ''
  const src =
    `https://www.youtube-nocookie.com/embed/${videoId}` +
    `?autoplay=1&playsinline=1&rel=0&enablejsapi=1&origin=${encodeURIComponent(origin)}`

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (!YT_ORIGIN.test(e.origin) || e.source !== iframeRef.current?.contentWindow) return
      let data: { event?: string; info?: unknown }
      try {
        data = typeof e.data === 'string' ? JSON.parse(e.data) : e.data
      } catch {
        return
      }
      const state =
        data?.event === 'onStateChange'
          ? data.info
          : (data?.info as { playerState?: number } | undefined)?.playerState
      if (state === 1) setPlaying(true) // 1 = reproduciendo
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  // Pide al reproductor que nos avise de sus cambios de estado.
  const subscribe = () => {
    iframeRef.current?.contentWindow?.postMessage(JSON.stringify({ event: 'listening', id: 'song', channel: 'widget' }), '*')
  }

  return (
    <section className="song" aria-labelledby="song-title">
      <p className="song__label">{label}</p>
      <h2 id="song-title" className="song__title">
        {title}
      </h2>
      <p className="song__phrase">{phrase}</p>

      <p className={`song__hint${playing ? ' is-hidden' : ''}`} aria-hidden={playing}>
        {playHint}
      </p>

      <div className="song__player">
        <iframe
          ref={iframeRef}
          src={src}
          title={`${title} — video de YouTube`}
          allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
          allowFullScreen
          referrerPolicy="strict-origin-when-cross-origin"
          onLoad={subscribe}
        />
      </div>

      <a className="song__fallback" href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer">
        {fallbackLink} ↗
      </a>
    </section>
  )
}
