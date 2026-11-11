import type { CSSProperties } from 'react'
import { content } from '../content'
import type { SongAudio } from '../hooks/useSongAudio'
import { NootPenguin, Penguin } from './Penguin'

const fmt = (s: number) => {
  const t = Math.max(0, Math.floor(s))
  return `${Math.floor(t / 60)}:${String(t % 60).padStart(2, '0')}`
}

export function Song({ audio }: { audio: SongAudio }) {
  const { label, title, phrase, videoId, fallbackLink, playHint } = content.song
  const { playing, blocked, time, duration, toggle, seek } = audio
  const progress = duration > 0 ? (time / duration) * 100 : 0

  return (
    <section className="song" aria-labelledby="song-title">
      {/* pingüinito con audífonos: se balancea mientras suena la canción */}
      <NootPenguin className={`song-penguin${playing ? ' is-grooving' : ''}`} bubble="left">
        <Penguin headphones />
      </NootPenguin>
      <p className="song__label">{label}</p>
      <h2 id="song-title" className="song__title">
        {title}
      </h2>
      <p className="song__phrase">{phrase}</p>

      {/* Solo aparece si el navegador no dejó que empezara sola al abrir el sobre. */}
      <p className={`song__hint${blocked && !playing ? '' : ' is-hidden'}`} aria-hidden={!blocked || playing}>
        <svg className="song__hint-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.2-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
        </svg>
        {playHint}
      </p>

      <div className={`player${playing ? ' is-playing' : ''}`}>
        <button
          type="button"
          className="player__btn"
          onClick={toggle}
          aria-label={playing ? `Pausar ${title}` : `Reproducir ${title}`}
        >
          {playing ? (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <rect x="6" y="5" width="4" height="14" rx="1.2" />
              <rect x="14" y="5" width="4" height="14" rx="1.2" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.2-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
            </svg>
          )}
        </button>

        <div className="player__track">
          <input
            type="range"
            className="player__range"
            min={0}
            max={duration || 0}
            step={0.1}
            value={Math.min(time, duration || 0)}
            onChange={(e) => seek(Number(e.target.value))}
            disabled={!duration}
            aria-label={`Avance de ${title}`}
            aria-valuetext={`${fmt(time)} de ${fmt(duration)}`}
            style={{ '--p': `${progress}%` } as CSSProperties}
          />
          <div className="player__times" aria-hidden="true">
            <span>{fmt(time)}</span>
            <span className="player__bars">
              <i />
              <i />
              <i />
              <i />
            </span>
            <span>{duration ? fmt(duration) : '–:––'}</span>
          </div>
        </div>
      </div>

      <a className="song__fallback" href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer">
        {fallbackLink}
        <svg className="song__fallback-icon" viewBox="0 0 24 24" aria-hidden="true">
          <path d="M14 4h6v6M20 4l-9 9M18 14v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4" />
        </svg>
      </a>
    </section>
  )
}
