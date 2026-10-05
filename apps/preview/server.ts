import { serve } from 'bun';
import page from './index.html';

const server = serve({
  port: Number(process.env.PORT ?? 3000),
  development: { hmr: false },
  routes: { '/': page },
});

console.log(`Component preview running at ${server.url}`);
