# feliz-cumple-allison

Tarjeta de cumpleaños web interactiva (Vite + React + TypeScript), lista para desplegar en Cloudflare Workers con static assets.

## Pasos

```bash
npm install          # instala dependencias
npm run dev          # servidor local en http://localhost:5173
npx wrangler login   # inicia sesión en Cloudflare (una sola vez)
npm run deploy       # compila y publica en Cloudflare
```

Al terminar, Wrangler muestra la URL (`https://feliz-cumple-allison.<tu-subdominio>.workers.dev`).

**Antes de mandarla por WhatsApp:** pega esa URL en `meta.siteUrl` dentro de `src/content.ts` y corre `npm run deploy` otra vez. WhatsApp necesita la URL completa para mostrar la imagen de vista previa (`public/og-image.png`).

## Editar el texto

Todo el contenido (nombre, título, párrafos, firma, video de YouTube y en qué párrafo va, título, descripción e imagen del link) está en `src/content.ts`.
