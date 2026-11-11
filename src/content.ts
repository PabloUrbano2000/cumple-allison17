/**
 * Todo el texto de la tarjeta vive aquí.
 * Edita este archivo para cambiar nombres, mensajes o el video,
 * sin tocar los componentes.
 */

export type Paragraph = {
  text: string
  /** Si es true, se muestra en cursiva y más apagado, como un susurro. */
  whisper?: boolean
}

export const content = {
  recipient: 'Allison',

  /** Metadatos para la pestaña y para la vista previa al compartir el link. */
  meta: {
    title: 'Feliz cumpleaños, Allison',
    description: 'Alguien te dejó una carta. Ábrela 💌',
    /**
     * URL pública del sitio, sin barra final (ej: 'https://feliz-cumple-allison.tu-subdominio.workers.dev').
     * WhatsApp necesita una URL absoluta para mostrar la imagen de vista previa:
     * complétala después del primer deploy y vuelve a desplegar.
     */
    siteUrl: '',
    /** Imagen de vista previa (1200×630), en public/. */
    image: '/og-image.png',
    imageAlt: 'Un sobre con un sello de corazón bajo un cielo estrellado: Para Allison',
  },

  envelope: {
    to: 'Para Allison',
    subtitle: 'alguien te dejó una carta',
    hint: 'toca para abrir',
    ariaLabel: 'Abrir el sobre con la carta para Allison',
  },

  title: '¡Feliz cumpleaños, Allison!',

  paragraphs: [
    {
      text: 'Hoy celebro que existas. Te conocí cuando tenías 15 y ahora cumples 17. En este tiempo te vi crecer, cambiar y volverte una persona increíble, y no sabes lo orgulloso que estoy de ti.',
    },
    {
      text: 'Sé que pronto te vas, y que la distancia va a ponerse entre nosotros. No te voy a mentir: me cuesta. Por eso elegí esta canción. Es de alguien mayor que cuidó a una pequeña en un mundo que a veces no se entiende, y que quiso protegerla incluso cuando él mismo se estaba perdiendo. Lo único que quería era que ella supiera que no estaba sola.',
    },
    {
      text: 'Y si algún día el tiempo me cambia, quiero que esto quede escrito: siempre fuiste importante para mí. A veces siento que la vida me va alejando de ti, y me acuerdo de las veces que te vi triste y me quedé pensando qué más pude haber hecho. Si alguna vez te fallé, o hice o dije algo que no se parecía a mí, perdóname: eso no era yo. Esto sí.',
      whisper: true,
    },
    {
      text: 'Sé que crecer a veces confunde, y que va a haber días en que nada tenga sentido. En esos días, acuérdate de que aquí hay alguien que cree en ti.',
    },
    {
      text: 'Eso es lo que quiero que te lleves: pase lo que pase, vayas donde vayas, aquí siempre vas a tener a alguien que te cuida desde lejos, que celebra todo lo bueno que te pase y que va a estar feliz de saber de ti. Y si algún día necesitas algo, aunque sea un consejo de viejo, ya sabes dónde encontrarme.',
    },
  ] satisfies Paragraph[],

  cake: {
    prompt: 'pide un deseo y sopla la vela 👇',
    done: '¡Deseo pedido! Que se cumpla ✨',
    ariaBlow: 'Soplar la vela de la torta',
    ariaRelight: 'Volver a encender la vela',
  },

  song: {
    label: 'Nuestra canción',
    title: 'I Remember You',
    phrase: 'cada vez que la escuches, acuérdate de mí',
    /** Archivo de audio en public/. Empieza a sonar al tocar el sobre. */
    audioSrc: '/remember-you.mp3',
    /** Texto para la pantalla de bloqueo del celular mientras suena. */
    audioArtist: 'para Allison 💛',
    /** Video de YouTube para el link de respaldo. */
    videoId: 'PA2PsADo11E',
    fallbackLink: 'Ver el video en YouTube',
    /** Aviso que aparece solo si el navegador no dejó que la música empezara sola. */
    playHint: '▶ toca play para escucharla',
    /** La tarjeta de la canción va después de este párrafo (contando desde 1). */
    afterParagraph: 2,
  },

  signature: {
    closing: 'Con cariño,',
    name: 'Mandy 💛',
  },

  footer: '✦ feliz vuelta al sol ✦',
}
