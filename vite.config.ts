import { defineConfig, type HtmlTagDescriptor, type Logger, type Plugin } from 'vite'
import react from '@vitejs/plugin-react'
import { content } from './src/content.ts'

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')

/** Inyecta título, descripción e imagen de src/content.ts en index.html al compilar. */
function contentMeta(): Plugin {
  const { title, description, siteUrl, image, imageAlt } = content.meta
  const base = siteUrl.replace(/\/+$/, '')
  const values: Record<string, string> = {
    __META_TITLE__: title,
    __META_DESCRIPTION__: description,
    __META_IMAGE__: base ? base + image : image,
    __META_IMAGE_ALT__: imageAlt,
  }
  let logger: Logger | undefined
  let isBuild = false

  return {
    name: 'content-meta',
    configResolved(config) {
      logger = config.logger
      isBuild = config.command === 'build'
    },
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => {
        if (isBuild && !base) {
          logger?.warn(
            '\n⚠ content.meta.siteUrl está vacío: WhatsApp no mostrará la imagen de vista previa.\n' +
              '  Pon la URL del sitio en src/content.ts y vuelve a desplegar.\n',
          )
        }
        const tags: HtmlTagDescriptor[] = base
          ? [{ tag: 'meta', attrs: { property: 'og:url', content: base + '/' }, injectTo: 'head' }]
          : []
        return {
          html: html.replace(/__META_[A-Z_]+?__/g, (key) => escapeHtml(values[key] ?? key)),
          tags,
        }
      },
    },
  }
}

export default defineConfig({
  plugins: [react(), contentMeta()],
})
