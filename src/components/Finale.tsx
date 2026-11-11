import { useEffect, useMemo, useRef } from 'react'
import { content } from '../content'
import type { SongAudio } from '../hooks/useSongAudio'
import { NootPenguin, PenguinPair } from './Penguin'

const LIGHT_COLORS = ['#ffe3a0', '#ffc3d4', '#fff4e4', '#e3cdfa']

type Props = {
  onBack: () => void
  song: SongAudio
}

/** Vista final que aparece al soplar la vela: el deseo y la firma sobre un amanecer. */
export function Finale({ onBack, song }: Props) {
  const { label, wish, back, replay, resume, listen } = content.finale
  // La canción dura 2:03: lo normal es que ya haya terminado al llegar aquí.
  const songLabel = song.ended ? replay : song.time > 1 ? resume : listen
  const headingRef = useRef<HTMLHeadingElement>(null)

  // Lucecitas que suben despacio, como farolitos.
  const lights = useMemo(
    () =>
      Array.from({ length: 18 }, (_, i) => ({
        left: Math.random() * 100,
        size: 4 + Math.random() * 7,
        delay: Math.random() * 9,
        duration: 10 + Math.random() * 8,
        color: LIGHT_COLORS[i % LIGHT_COLORS.length],
      })),
    [],
  )

  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true })
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onBack()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onBack])

  return (
    <section className="finale" role="dialog" aria-modal="true" aria-labelledby="finale-title">
      <div className="finale__lights" aria-hidden="true">
        {lights.map((l, i) => (
          <span
            key={i}
            style={{
              left: `${l.left}%`,
              width: l.size,
              height: l.size,
              background: l.color,
              color: l.color,
              animationDelay: `${l.delay}s`,
              animationDuration: `${l.duration}s`,
            }}
          />
        ))}
      </div>

      <div className="finale__card">
        <h2 id="finale-title" className="finale__label" ref={headingRef} tabIndex={-1}>
          {label}
        </h2>
        <p className="finale__wish">{wish}</p>
        <p className="finale__signature">
          {content.signature.closing}
          <br />
          {content.signature.name}
        </p>
        <p className="finale__footer">{content.footer}</p>
      </div>

      {/* los dos, tomados de la aleta, mirando salir el sol */}
      <NootPenguin className="finale__penguins">
        <PenguinPair />
      </NootPenguin>

      <div className="finale__actions">
        <button type="button" className="finale__btn" onClick={onBack}>
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="M15 18l-6-6 6-6" />
          </svg>
          {back}
        </button>

        {/* aparece solo si la canción no está sonando (normalmente, porque ya terminó) */}
        {!song.playing && (
          <button type="button" className="finale__btn finale__btn--song" onClick={song.play}>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.2-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5Z" />
            </svg>
            {songLabel}
          </button>
        )}
      </div>
    </section>
  )
}
