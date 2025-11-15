import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      external: ['mf-navbar', 'mf-search', 'mf-order']
    }
  },
  optimizeDeps: {
    exclude: ['mf-navbar', 'mf-search', 'mf-order']
  }
})

