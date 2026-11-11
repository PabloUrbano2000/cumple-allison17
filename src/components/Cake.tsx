import { content } from '../content'

type Props = {
  blown: boolean
  onToggle: (origin: { x: number; y: number }) => void
}

export function Cake({ blown, onToggle }: Props) {
  const { prompt, done, ariaBlow, ariaRelight } = content.cake

  return (
    <div className="cake-block">
      <p className="cake-block__prompt">{prompt}</p>

      <button
        type="button"
        className={`cake${blown ? ' is-blown' : ''}`}
        aria-label={blown ? ariaRelight : ariaBlow}
        aria-pressed={blown}
        onClick={(e) => {
          const r = e.currentTarget.getBoundingClientRect()
          // La vela está arriba al centro de la torta.
          onToggle({ x: r.left + r.width / 2, y: r.top + r.height * 0.2 })
        }}
      >
        <svg viewBox="0 0 220 210" role="presentation" aria-hidden="true">
          <defs>
            <radialGradient id="glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffd98a" stopOpacity="0.75" />
              <stop offset="100%" stopColor="#ffd98a" stopOpacity="0" />
            </radialGradient>
            <linearGradient id="flame" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#fff3b0" />
              <stop offset="55%" stopColor="#ffb547" />
              <stop offset="100%" stopColor="#ff7a3d" />
            </linearGradient>
            <pattern id="candle-stripes" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
              <rect width="8" height="8" fill="#fff6ea" />
              <rect width="3.5" height="8" fill="#f49ab8" />
            </pattern>
          </defs>

          {/* plato */}
          <ellipse cx="110" cy="192" rx="96" ry="11" fill="#efe3cf" />
          <ellipse cx="110" cy="189" rx="88" ry="7" fill="#f8efe0" />

          {/* piso de abajo */}
          <rect x="28" y="126" width="164" height="64" rx="10" fill="#f4b3c7" />
          <rect x="28" y="160" width="164" height="6" fill="#fbdbe5" />
          <rect x="28" y="124" width="164" height="14" rx="7" fill="#fff4e4" />
          {[40, 62, 86, 112, 136, 160, 181].map((cx, i) => (
            <ellipse key={cx} cx={cx} cy="138" rx="7" ry={i % 2 ? 7 : 10} fill="#fff4e4" />
          ))}
          {[
            [48, 176, '#c6a4f0'],
            [74, 152, '#9be3c6'],
            [100, 178, '#f2c55c'],
            [128, 151, '#c6a4f0'],
            [150, 177, '#9be3c6'],
            [174, 154, '#f2c55c'],
          ].map(([x, y, c]) => (
            <rect key={`${x}-${y}`} x={x as number} y={y as number} width="7" height="2.6" rx="1.3" fill={c as string} transform={`rotate(${(x as number) % 60} ${x} ${y})`} />
          ))}

          {/* piso de arriba */}
          <rect x="58" y="80" width="104" height="50" rx="9" fill="#c9a9ef" />
          <rect x="58" y="78" width="104" height="12" rx="6" fill="#fff4e4" />
          {[68, 88, 110, 132, 152].map((cx, i) => (
            <ellipse key={cx} cx={cx} cy="90" rx="6" ry={i % 2 ? 9 : 6} fill="#fff4e4" />
          ))}
          {[
            [76, 112, '#f49ab8'],
            [104, 118, '#f2c55c'],
            [138, 110, '#9be3c6'],
          ].map(([x, y, c]) => (
            <circle key={`${x}-${y}`} cx={x as number} cy={y as number} r="2.4" fill={c as string} />
          ))}

          {/* vela */}
          <rect x="104" y="44" width="12" height="38" rx="2.5" fill="url(#candle-stripes)" />
          <line x1="110" y1="44" x2="110" y2="36" stroke="#5a4636" strokeWidth="2" strokeLinecap="round" />

          {/* llama */}
          <g className="cake__fire">
            <circle cx="110" cy="26" r="22" fill="url(#glow)" />
            <g className="cake__flame">
              <path d="M110 6 C119 19 122 28 117 35 C114 39.5 106 39.5 103 35 C98 28 101 19 110 6 Z" fill="url(#flame)" />
              <path d="M110 20 C114 26 115 31 112.5 34 C111 36 109 36 107.5 34 C105 31 106 26 110 20 Z" fill="#fffbe6" />
            </g>
          </g>

          {/* humito al apagarla */}
          {blown && (
            <g className="cake__smoke" fill="none" stroke="#d8d2e6" strokeWidth="2.2" strokeLinecap="round">
              <path d="M110 34 C104 26 116 20 109 11 C104 5 112 0 110 -6" />
            </g>
          )}
        </svg>
      </button>

      <p className="cake-block__done" aria-live="polite">
        {blown ? done : ''}
      </p>
    </div>
  )
}
