import { Fragment, type Ref } from 'react'
import { content } from '../content'
import { Cake } from './Cake'
import { Song } from './Song'

type Props = {
  titleRef: Ref<HTMLHeadingElement>
  blown: boolean
  onToggleCandle: (origin: { x: number; y: number }) => void
}

export function Letter({ titleRef, blown, onToggleCandle }: Props) {
  return (
    <article className="letter">
      <h1 className="letter__title" ref={titleRef} tabIndex={-1}>
        {content.title}
      </h1>

      {content.paragraphs.map((p, i) => (
        <Fragment key={i}>
          <p className={p.whisper ? 'letter__p letter__p--whisper' : 'letter__p'}>{p.text}</p>
          {i + 1 === content.song.afterParagraph && <Song />}
        </Fragment>
      ))}

      <Cake blown={blown} onToggle={onToggleCandle} />

      <p className="letter__signature">
        {content.signature.closing} {content.signature.name}
      </p>
    </article>
  )
}
