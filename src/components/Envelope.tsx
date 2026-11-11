import { content } from '../content'
import { NootPenguin, Penguin } from './Penguin'

type Props = {
  /** Las fuentes ya cargaron: se muestra con un fade. */
  ready: boolean
  opened: boolean
  leaving: boolean
  onOpen: () => void
}

export function Envelope({ ready, opened, leaving, onOpen }: Props) {
  const { to, subtitle, hint, ariaLabel } = content.envelope
  return (
    <section className={`intro${ready ? ' is-ready' : ''}${leaving ? ' is-leaving' : ''}`}>
      <h1 className="intro__to">{to}</h1>
      <p className="intro__subtitle">{subtitle}</p>

      <div className="envelope-stage">
      {/* el pingüinito que trajo la carta */}
      <NootPenguin className="envelope-penguin" bubble="left">
        <Penguin wave />
      </NootPenguin>
      <button
        type="button"
        className={`envelope${opened ? ' is-open' : ''}`}
        onClick={onOpen}
        aria-label={ariaLabel}
        aria-expanded={opened}
        disabled={opened}
      >
        <span className="envelope__back" />
        <span className="envelope__paper" />
        <span className="envelope__front" />
        <span className="envelope__flap" />
        <span className="envelope__seal" aria-hidden="true">
          ♥
        </span>
      </button>
      </div>

      <p className="intro__hint" aria-hidden="true">
        {hint}
      </p>
    </section>
  )
}
