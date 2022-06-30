import { defineConfig } from 'vite'

export default defineConfig({
  ssr: {
    format: 'cjs'
  },
  legacy: {
    buildSsrCjsExternalHeuristics: true
  },
  server:{
    host : '0.0.0.0',
    port : 5000
  }
})
