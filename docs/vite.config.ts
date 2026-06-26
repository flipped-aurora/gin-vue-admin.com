import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  ssr: {
    format: 'cjs'
  },
  legacy: {
    buildSsrCjsExternalHeuristics: true
  },
  server: {
    host: '0.0.0.0',
    port: 5000
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '.')  // @ 指向 docs/
    }
  }
})