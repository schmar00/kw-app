import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
export default defineConfig({
  base: "/kw-app/",
  plugins: [svelte()],
  server: {
    proxy: {
      '/graphdb': {
        target: 'https://resource.geosphere.at',
        changeOrigin: true,
      },
    },
  },
})
