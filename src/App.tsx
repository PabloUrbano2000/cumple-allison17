import { useEffect, useRef, useState } from 'react'
import { content } from './content'
import { useReducedMotion } from './hooks/useReducedMotion'
import { useFontsReady } from './hooks/useFontsReady'
import { StarsCanvas } from './components/StarsCanvas'
import { Confetti, type ConfettiHandle } from './components/Confetti'
import { Envelope } from './components/Envelope'
import { Letter } from './components/Letter'

type Stage = 'closed' | 'opening' | 'open'

export function App() {
  const reducedMotion = useReducedMotion()
  const fontsReady = useFontsReady()
  const [stage, setStage] = useState<Stage>('closed')
  const [blown, setBlown] = useState(false)
  const [hasBlown, setHasBlown] = useState(false)
  const confetti = useRef<ConfettiHandle>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const timers = useRef<number[]>([])

  useEffect(() => () => timers.current.forEach(clearTimeout), [])

  const openEnvelope = () => {
    if (stage !== 'closed') return
    setStage('opening')
    window.scrollTo(0, 0)
    timers.current.push(
      // la solapa termina de abrirse → confeti
      window.setTimeout(() => confetti.current?.burst(), reducedMotion ? 0 : 650),
      // el sobre ya se desvaneció → lo quitamos y llevamos el foco a la carta
      window.setTimeout(
        () => {
          setStage('open')
          titleRef.current?.focus({ preventScroll: true })
        },
        reducedMotion ? 50 : 1500,
      ),
    )
  }

  const toggleCandle = (origin: { x: number; y: number }) => {
    const next = !blown
    setBlown(next)
    if (next) {
      setHasBlown(true)
      confetti.current?.burst({ ...origin, count: 110 })
    }
  }

  return (
    <>
      <div className="sky" aria-hidden="true">
        <StarsCanvas reducedMotion={reducedMotion} />
      </div>

      {stage !== 'closed' && (
        <main className="page">
          <Letter titleRef={titleRef} blown={blown} onToggleCandle={toggleCandle} />
          {hasBlown && <footer className="footer">{content.footer}</footer>}
        </main>
      )}

      {stage !== 'open' && <Envelope ready={fontsReady} opened={stage !== 'closed'} leaving={stage === 'opening'} onOpen={openEnvelope} />}

      <Confetti ref={confetti} disabled={reducedMotion} />
    </>
  )
}
