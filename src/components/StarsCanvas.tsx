import { useEffect, useRef } from 'react'
import { useCanvas, type CanvasSize } from '../hooks/useCanvas'

type Star = {
  /** Posición normalizada (0–1), así no se regeneran al cambiar el tamaño. */
  x: number
  y: number
  r: number
  base: number
  amp: number
  speed: number
  phase: number
  color: string
}

const COLORS = ['#ffffff', '#fff4d6', '#e3e8ff', '#f6e7ff']

function makeStars(count: number): Star[] {
  return Array.from({ length: count }, () => {
    const big = Math.random() < 0.08
    return {
      x: Math.random(),
      y: Math.random(),
      r: big ? 1.3 + Math.random() * 0.9 : 0.4 + Math.random() * 0.9,
      base: 0.35 + Math.random() * 0.45,
      amp: 0.15 + Math.random() * 0.35,
      speed: 0.6 + Math.random() * 1.8,
      phase: Math.random() * Math.PI * 2,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    }
  })
}

export function StarsCanvas({ reducedMotion }: { reducedMotion: boolean }) {
  const starsRef = useRef<Star[]>([])
  const drawRef = useRef<(t: number) => void>(() => {})

  const { canvasRef, ctxRef, sizeRef } = useCanvas((_ctx, size: CanvasSize) => {
    if (starsRef.current.length === 0) {
      starsRef.current = makeStars(Math.round(Math.min(280, Math.max(90, (size.width * size.height) / 4200))))
    }
    drawRef.current(performance.now())
  })

  drawRef.current = (t: number) => {
    const ctx = ctxRef.current
    if (!ctx) return
    const { width, height } = sizeRef.current
    ctx.clearRect(0, 0, width, height)
    for (const s of starsRef.current) {
      const twinkle = reducedMotion ? 0 : Math.sin((t / 1000) * s.speed + s.phase)
      const alpha = Math.min(1, Math.max(0.05, s.base + s.amp * twinkle))
      const x = s.x * width
      const y = s.y * height
      ctx.globalAlpha = alpha
      ctx.fillStyle = s.color
      ctx.beginPath()
      ctx.arc(x, y, s.r, 0, Math.PI * 2)
      ctx.fill()
      if (s.r > 1.3) {
        // Destello en cruz para las estrellas más grandes.
        const len = s.r * (3 + 2 * Math.max(0, twinkle))
        ctx.globalAlpha = alpha * 0.45
        ctx.strokeStyle = s.color
        ctx.lineWidth = 0.6
        ctx.beginPath()
        ctx.moveTo(x - len, y)
        ctx.lineTo(x + len, y)
        ctx.moveTo(x, y - len)
        ctx.lineTo(x, y + len)
        ctx.stroke()
      }
    }
    ctx.globalAlpha = 1
  }

  useEffect(() => {
    if (reducedMotion) {
      drawRef.current(0)
      return
    }
    let raf = 0
    const loop = (t: number) => {
      drawRef.current(t)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [reducedMotion])

  return <canvas ref={canvasRef} className="stars" aria-hidden="true" />
}
