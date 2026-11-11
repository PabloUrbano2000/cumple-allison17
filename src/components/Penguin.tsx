import { useEffect, useId, useRef, useState, type ReactNode } from 'react'
import { content } from '../content'

/*
 * Pingüinitos de diseño propio (redondos, tipo plastilina).
 * No copian a ningún personaje: solo un guiño a su estilo.
 */

const NAVY_LIGHT = '#4a5482'
const NAVY = '#262c4c'
const NAVY_DARK = '#191d36'
const ORANGE = '#f6a54a'

function BodyDefs({ id }: { id: string }) {
  return (
    <defs>
      <radialGradient id={`${id}-body`} cx="35%" cy="28%" r="80%">
        <stop offset="0%" stopColor={NAVY_LIGHT} />
        <stop offset="55%" stopColor={NAVY} />
        <stop offset="100%" stopColor={NAVY_DARK} />
      </radialGradient>
      <radialGradient id={`${id}-belly`} cx="45%" cy="35%" r="75%">
        <stop offset="0%" stopColor="#fffcf4" />
        <stop offset="100%" stopColor="#efe1c8" />
      </radialGradient>
    </defs>
  )
}

const BODY = 'M50 14 C76 14 86 40 86 70 C86 98 70 112 50 112 C30 112 14 98 14 70 C14 40 24 14 50 14 Z'

type FrontProps = {
  className?: string
  /** Gorrito de cumpleaños. */
  hat?: boolean
  /** Saluda moviendo una aleta. */
  wave?: boolean
  /** Audífonos para escuchar la canción. */
  headphones?: boolean
}

/** Pingüino de frente. */
export function Penguin({ className, hat, wave, headphones }: FrontProps) {
  const id = useId().replace(/:/g, '')
  return (
    <svg className={className} viewBox="0 -14 100 134" aria-hidden="true">
      <BodyDefs id={id} />
      <ellipse cx="50" cy="116" rx="30" ry="3.5" fill="rgba(0,0,0,0.16)" />

      {/* aletas */}
      <ellipse cx="18" cy="70" rx="8" ry="20" transform="rotate(18 18 70)" fill={NAVY} />
      <g className={wave ? 'penguin__wave' : undefined}>
        <ellipse cx="82" cy="70" rx="8" ry="20" transform="rotate(-18 82 70)" fill={NAVY} />
      </g>

      {/* patitas */}
      <ellipse cx="38" cy="111" rx="11" ry="5.5" fill={ORANGE} />
      <ellipse cx="62" cy="111" rx="11" ry="5.5" fill={ORANGE} />

      {/* cuerpo y pancita */}
      <path d={BODY} fill={`url(#${id}-body)`} />
      <path
        d="M50 30 C64 30 72 40 72 50 C72 56 70 59 72 66 C76 80 72 104 50 106 C28 104 24 80 28 66 C30 59 28 56 28 50 C28 40 36 30 50 30 Z"
        fill={`url(#${id}-belly)`}
      />

      {/* carita */}
      <circle cx="41" cy="48" r="4.5" fill="#1d1a2b" />
      <circle cx="59" cy="48" r="4.5" fill="#1d1a2b" />
      <circle cx="42.6" cy="46.3" r="1.5" fill="#fff" />
      <circle cx="60.6" cy="46.3" r="1.5" fill="#fff" />
      <ellipse cx="34" cy="58" rx="5" ry="3" fill="#f49ab8" opacity="0.6" />
      <ellipse cx="66" cy="58" rx="5" ry="3" fill="#f49ab8" opacity="0.6" />
      <path d="M44.5 55 Q50 51.5 55.5 55 Q53 61 50 61.5 Q47 61 44.5 55 Z" fill={ORANGE} />

      {headphones && (
        <g>
          <path d="M21 42 C19 2 81 2 79 42" fill="none" stroke="#f49ab8" strokeWidth="5" strokeLinecap="round" />
          <rect x="11" y="34" width="15" height="22" rx="7" fill="#e37fa0" />
          <rect x="14" y="37" width="9" height="16" rx="4.5" fill="#f7b3c9" />
          <rect x="74" y="34" width="15" height="22" rx="7" fill="#e37fa0" />
          <rect x="77" y="37" width="9" height="16" rx="4.5" fill="#f7b3c9" />
        </g>
      )}

      {hat && (
        <g transform="rotate(16 66 14)">
          <path d="M53 22 L66 -10 L79 22 Z" fill="#f49ab8" />
          <path d="M57.5 11 L74.5 11 L76.4 16 L55.6 16 Z" fill="#fff4e4" />
          <path d="M61.5 1 L70.5 1 L72 5 L60 5 Z" fill="#fff4e4" />
          <ellipse cx="66" cy="22" rx="14" ry="3" fill="#e37fa0" />
          <circle cx="66" cy="-10" r="4.5" fill="#f2c55c" />
        </g>
      )}
    </svg>
  )
}

/**
 * Pingüino de espaldas (para mirar el amanecer).
 * `free` es el lado de la aleta suelta; la otra aleta la dibuja la pareja, tomada de la mano.
 */
function BackPenguin({ id, free }: { id: string; free: 'left' | 'right' }) {
  return (
    <>
      {free === 'left' ? (
        <ellipse cx="18" cy="70" rx="8" ry="20" transform="rotate(14 18 70)" fill={NAVY_DARK} />
      ) : (
        <ellipse cx="82" cy="70" rx="8" ry="20" transform="rotate(-14 82 70)" fill={NAVY_DARK} />
      )}
      <ellipse cx="38" cy="111" rx="11" ry="5" fill={ORANGE} />
      <ellipse cx="62" cy="111" rx="11" ry="5" fill={ORANGE} />
      <path d={BODY} fill={`url(#${id}-body)`} />
      {/* colita y mechoncito */}
      <path d="M44 106 Q50 116 56 106 Z" fill={NAVY_DARK} />
      <path d="M47 15 Q49 6 53 10 Q51 12 52 15 Z" fill={NAVY} />
    </>
  )
}

/** Un pingüino grande y uno chiquito, de espaldas y tomados de la aleta, mirando el amanecer. */
export function PenguinPair({ className }: { className?: string }) {
  const id = useId().replace(/:/g, '')
  return (
    <svg className={className} viewBox="0 0 196 124" aria-hidden="true">
      <BodyDefs id={id} />
      <ellipse cx="98" cy="120" rx="86" ry="4" fill="rgba(60,20,40,0.18)" />

      {/* aletas tomadas: salen de cada hombro (escondidas bajo el cuerpo) y se juntan entre los dos */}
      <ellipse cx="100" cy="76" rx="6.5" ry="19" transform="rotate(-40 100 76)" fill={NAVY} />
      <ellipse cx="116" cy="85" rx="4.6" ry="11.5" transform="rotate(50 116 85)" fill={NAVY} />

      {/* grande */}
      <g transform="translate(8 4)">
        <BackPenguin id={id} free="left" />
      </g>

      {/* chiquita */}
      <g transform="translate(112 42) scale(0.68)">
        <BackPenguin id={id} free="right" />
      </g>
    </svg>
  )
}

type NootProps = {
  className?: string
  /** Hacia dónde se abre la burbuja, para que no se salga de la pantalla. */
  bubble?: 'left' | 'right' | 'center'
  children: ReactNode
}

/**
 * Envuelve un pingüino para que se pueda tocar: da un saltito y dice "noot noot!".
 * Es un detalle escondido para que ella lo descubra.
 */
export function NootPenguin({ className, bubble = 'center', children }: NootProps) {
  const [nooting, setNooting] = useState(false)
  const timer = useRef(0)

  useEffect(() => () => window.clearTimeout(timer.current), [])

  const noot = () => {
    setNooting(false)
    // reinicia la animación aunque lo toque varias veces seguidas
    requestAnimationFrame(() => setNooting(true))
    window.clearTimeout(timer.current)
    timer.current = window.setTimeout(() => setNooting(false), 1600)
    navigator.vibrate?.(25)
  }

  return (
    <button
      type="button"
      className={`noot${nooting ? ' is-nooting' : ''}${className ? ` ${className}` : ''}`}
      onClick={noot}
      aria-label={content.penguin.ariaLabel}
    >
      {children}
      <span className={`noot__bubble noot__bubble--${bubble}`} aria-live="polite">
        {nooting ? content.penguin.says : ''}
      </span>
    </button>
  )
}
