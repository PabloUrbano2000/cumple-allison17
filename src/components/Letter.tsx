import { Fragment, type Ref } from 'react'
import { content } from '../content'
import type { SongAudio } from '../hooks/useSongAudio'
import { Cake } from './Cake'
import { Song } from './Song'

type Props = {
  titleRef: Ref<HTMLHeadingElement>
  blown: boolean
  onToggleCandle: (origin: { x: number; y: number }) => void
  song: SongAudio
}

export function Letter({ titleRef, blown, onToggleCandle, song }: Props) {
  return (
    <article className="letter">
      <h1 className="letter__title" ref={titleRef} tabIndex={-1}>
        {content.title}
      </h1>

      {content.paragraphs.map((p, i) => (
        <Fragment key={i}>
          <p className={p.whisper ? 'letter__p letter__p--whisper' : 'letter__p'}>{p.text}</p>
          {i + 1 === content.song.afterParagraph && <Song audio={song} />}
        </Fragment>
      ))}

      <Cake blown={blown} onToggle={onToggleCandle} />
    </article>
  )
}
