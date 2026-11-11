import { useEffect, useRef } from 'react'

export type CanvasSize = { width: number; height: number; dpr: number }

/**
 * Mantiene un <canvas> nítido en pantallas retina: ajusta su resolución interna
 * al tamaño CSS × devicePixelRatio cada vez que cambia de tamaño.
 */
export function useCanvas(onResize?: (ctx: CanvasRenderingContext2D, size: CanvasSize) => void) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ctxRef = useRef<CanvasRenderingContext2D | null>(null)
  const sizeRef = useRef<CanvasSize>({ width: 0, height: 0, dpr: 1 })
  const onResizeRef = useRef(onResize)
  onResizeRef.current = onResize

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    ctxRef.current = ctx

    const fit = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 3)
      const width = canvas.clientWidth
      const height = canvas.clientHeight
      canvas.width = Math.max(1, Math.round(width * dpr))
      canvas.height = Math.max(1, Math.round(height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      sizeRef.current = { width, height, dpr }
      onResizeRef.current?.(ctx, sizeRef.current)
    }

    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(canvas)
    // El zoom o mover la ventana a otra pantalla cambia el devicePixelRatio sin cambiar el tamaño CSS.
    window.addEventListener('resize', fit)
    return () => {
      ro.disconnect()
      window.removeEventListener('resize', fit)
    }
  }, [])

  return { canvasRef, ctxRef, sizeRef }
}
