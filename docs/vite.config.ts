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
      // 统一插件接口代理：/pluginApi/* -> https://plugin.gin-vue-admin.com/api/*
      // 前缀 pluginApi 仅用于路由匹配，转发时会去除。
      // 仅在 vitepress dev 生效；生产需由部署层(nginx)做同样的转发
      '/pluginApi': {
        target: 'https://plugin.gin-vue-admin.com/api',
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/pluginApi/, '')
      }
    }
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, '.')  // @ 指向 docs/
    }
  }
})