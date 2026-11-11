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
      text: 'Hoy celebro que existas, y que la vida haya hecho que nuestros caminos se crucen otra vez.',
    },
    {
      text: 'Sé que pronto te vas, y que la distancia va a volver a ponerse entre nosotros. No te voy a mentir: me cuesta. Por eso elegí esta canción. Es de alguien que sabe que el tiempo y la distancia lo van a cambiar todo, pero que igual quiere dejar claro que lo que sintió fue real.',
    },
    {
      text: 'Y si algún día el tiempo me cambia, o me pierdo un poco de quien soy hoy, quiero que esto quede escrito: lo que te quise fue verdad. Lo que no te supe decir, lo que salió mal, eso no era yo. Esto sí.',
      whisper: true,
    },
    {
      text: 'Eso es lo que quiero que te lleves: pase lo que pase, vayas donde vayas, aquí hubo y hay alguien que te quiere bien, que celebra todo lo bueno que te pase y que siempre va a estar feliz de saber de ti.',
    },
    {
      text: 'Que este nuevo año te dé todo lo que mereces, que es muchísimo.',
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
    phrase: 'cada vez que la escuches, acuérdate de mí un ratito',
    videoId: 'PA2PsADo11E',
    fallbackLink: 'Abrir en YouTube',
    /** Aviso que se muestra hasta que el video empieza a sonar. */
    playHint: '▶ dale play mientras lees',
    /** La tarjeta de la canción va después de este párrafo (contando desde 1). */
    afterParagraph: 2,
  },

  signature: {
    closing: 'Con cariño,',
    name: 'Pablito 💛',
  },

  footer: '✦ feliz vuelta al sol ✦',
}
