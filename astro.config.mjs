import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind({
    applyBaseStyles: false,
  })],
  vite: {
    ssr: {
      noExternal: ['lucide-astro', 'three', 'reveal.js'],
    },
    optimizeDeps: {
      include: ['three', 'reveal.js'],
      exclude: ['lucide-astro'],
    },
  },
});
