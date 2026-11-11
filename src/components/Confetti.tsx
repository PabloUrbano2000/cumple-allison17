import { useImperativeHandle, useRef, type Ref } from 'react'
import { useCanvas } from '../hooks/useCanvas'

export type ConfettiHandle = {
  /** Lanza confeti desde un punto (coordenadas de la ventana). Por defecto, el centro. */
  burst: (opts?: { x?: number; y?: number; count?: number }) => void
}

type Piece = {
  x: number
  y: number
  vx: number
  vy: number
  rot: number
  vr: number
  wobble: number
  vw: number
  w: number
  h: number
  color: string
  round: boolean
  age: number
  ttl: number
}

// dorado, rosa, lila, crema y menta
const COLORS = ['#f2c55c', '#f49ab8', '#c6a4f0', '#fff1d6', '#9be3c6']

export function Confetti({ ref, disabled }: { ref?: Ref<ConfettiHandle>; disabled: boolean }) {
  const pieces = useRef<Piece[]>([])
  const raf = useRef(0)
  const last = useRef(0)
  const { canvasRef, ctxRef, sizeRef } = useCanvas()

  const frame = (t: number) => {
    const ctx = ctxRef.current
    if (!ctx) return
    const dt = Math.min(3, (t - (last.current || t)) / 16.67)
    last.current = t
    const { width, height } = sizeRef.current
    ctx.clearRect(0, 0, width, height)

    pieces.current = pieces.current.filter((p) => p.age < p.ttl && p.y < height + 40)
    for (const p of pieces.current) {
      p.age += dt
      p.vx *= Math.pow(0.985, dt)
      p.vy = p.vy * Math.pow(0.985, dt) + 0.22 * dt
      p.x += p.vx * dt + Math.sin(p.wobble) * 0.6 * dt
      p.y += p.vy * dt
      p.rot += p.vr * dt
      p.wobble += p.vw * dt

      const fade = Math.min(1, (p.ttl - p.age) / 30)
      ctx.save()
      ctx.globalAlpha = Math.max(0, fade)
      ctx.translate(p.x, p.y)
      ctx.rotate(p.rot)
      ctx.scale(1, Math.cos(p.wobble))
      ctx.fillStyle = p.color
      if (p.round) {
        ctx.beginPath()
        ctx.arc(0, 0, p.w / 2, 0, Math.PI * 2)
        ctx.fill()
      } else {
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h)
      }
      ctx.restore()
    }

    if (pieces.current.length > 0) {
      raf.current = requestAnimationFrame(frame)
    } else {
      raf.current = 0
      last.current = 0
    }
  }

  useImperativeHandle(
    ref,
    () => ({
      burst: ({ x, y, count } = {}) => {
        if (disabled) return
        const { width, height } = sizeRef.current
        const ox = x ?? width / 2
        const oy = y ?? height / 2
        const scale = Math.min(1.4, Math.max(0.8, Math.min(width, height) / 600))
        const n = count ?? 160
        for (let i = 0; i < n; i++) {
          const angle = Math.random() * Math.PI * 2
          const speed = (3 + Math.random() * 9) * scale
          const size = 6 + Math.random() * 6
          pieces.current.push({
            x: ox,
            y: oy,
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - 4 * scale,
            rot: Math.random() * Math.PI,
            vr: (Math.random() - 0.5) * 0.3,
            wobble: Math.random() * Math.PI * 2,
            vw: 0.08 + Math.random() * 0.12,
            w: size,
            h: size * (0.4 + Math.random() * 0.4),
            color: COLORS[i % COLORS.length],
            round: Math.random() < 0.25,
            age: 0,
            ttl: 140 + Math.random() * 90,
          })
        }
        if (!raf.current) raf.current = requestAnimationFrame(frame)
      },
    }),
    [disabled],
  )

  return <canvas ref={canvasRef} className="confetti" aria-hidden="true" />
}
