import { useEffect, useState } from 'react'

const FONTS = ['700 1em Caveat', '400 1em Lora', 'italic 400 1em Lora']

/**
 * true cuando las fuentes de Google ya cargaron (o pasó el tiempo límite),
 * para no mostrar el texto primero en otra fuente y que después cambie.
 */
export function useFontsReady(timeoutMs = 1500): boolean {
  const [ready, setReady] = useState(() => typeof document === 'undefined' || !('fonts' in document))

  useEffect(() => {
    if (ready) return
    let done = false
    const finish = () => {
      if (done) return
      done = true
      setReady(true)
    }
    const timer = window.setTimeout(finish, timeoutMs)
    Promise.all(FONTS.map((f) => document.fonts.load(f))).then(finish, finish)
    return () => window.clearTimeout(timer)
  }, [ready, timeoutMs])

  return ready
}
