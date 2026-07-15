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
    port: 5000,
    proxy: {
      // 插件市场接口代理：/shopPlugin/* -> https://plugin.gin-vue-admin.com/api/shopPlugin/*
      // 仅在 vitepress dev 生效；生产需由部署层(nginx)做同样的转发
      '/shopPlugin': {
        target: 'https://plugin.gin-vue-admin.com/api',
        changeOrigin: true,
        secure: false
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '.')  // @ 指向 docs/
    }
  }
})