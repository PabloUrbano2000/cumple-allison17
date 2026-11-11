import { useCallback, useEffect, useRef, useState } from 'react'
import { content } from './content'
import { useReducedMotion } from './hooks/useReducedMotion'
import { useFontsReady } from './hooks/useFontsReady'
import { useSongAudio } from './hooks/useSongAudio'
import { StarsCanvas } from './components/StarsCanvas'
import { Confetti, type ConfettiHandle } from './components/Confetti'
import { Envelope } from './components/Envelope'
import { Letter } from './components/Letter'
import { Finale } from './components/Finale'

type Stage = 'closed' | 'opening' | 'open'

export function App() {
  const reducedMotion = useReducedMotion()
  const fontsReady = useFontsReady()
  const song = useSongAudio(content.song.audioSrc, { title: content.song.title, artist: content.song.audioArtist })
  const [stage, setStage] = useState<Stage>('closed')
  const [blown, setBlown] = useState(false)
  const [finale, setFinale] = useState(false)
  const confetti = useRef<ConfettiHandle>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const timers = useRef<number[]>([])
  const finaleTimer = useRef(0)

  useEffect(
    () => () => {
      timers.current.forEach(clearTimeout)
      window.clearTimeout(finaleTimer.current)
    },
    [],
  )

  const openEnvelope = () => {
    if (stage !== 'closed') return
    // La música arranca en este mismo toque: es lo que permite que suene también en celular.
    song.play()
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
    window.clearTimeout(finaleTimer.current)
    if (next) {
      confetti.current?.burst({ ...origin, count: 110 })
      // Dejamos ver la vela apagada y el mensaje escribiéndose, y después amanece.
      finaleTimer.current = window.setTimeout(
        () => {
          setFinale(true)
          confetti.current?.burst({ y: window.innerHeight * 0.3, count: 80 })
        },
        reducedMotion ? 400 : 3200,
      )
    }
  }

  const closeFinale = useCallback(() => {
    setFinale(false)
    requestAnimationFrame(() => document.querySelector<HTMLButtonElement>('.cake')?.focus({ preventScroll: true }))
  }, [])

  return (
    <>
      <div className={`sky${finale ? ' is-dawn' : ''}`} aria-hidden="true">
        <StarsCanvas reducedMotion={reducedMotion} />
        <div className="sky__dawn" />
      </div>

      {stage !== 'closed' && (
        <main className={`page${finale ? ' is-away' : ''}`} inert={finale}>
          <Letter titleRef={titleRef} blown={blown} onToggleCandle={toggleCandle} song={song} />
        </main>
      )}

      {finale && <Finale onBack={closeFinale} song={song} />}

      {stage !== 'open' && <Envelope ready={fontsReady} opened={stage !== 'closed'} leaving={stage === 'opening'} onOpen={openEnvelope} />}

      <Confetti ref={confetti} disabled={reducedMotion} />
    </>
  )
}
