import { serve } from 'bun';
import page from './index.html';

const server = serve({
  port: Number(process.env.DOCS_PORT ?? 3001),
  development: { hmr: false },
  routes: {
    '/': page,
    '/getting-started': page,
    '/themes': page,
    '/components': page,
    '/components/:slug': page,
  },
});

console.log(`Ink UI docs running at ${server.url}`);
