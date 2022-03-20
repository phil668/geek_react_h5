import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const path = require('path')
// 导入 postcss的插件
const pxToViewport = require('postcss-px-to-viewport')
// 配置插件 传入 视口的宽度
const vw = pxToViewport({
  // 视口宽度，一般就是 375（ 设计稿一般采用二倍稿，宽度为 375 ）
  viewportWidth: 375,
})

export default defineConfig({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '~@scss': path.resolve(__dirname, 'src', 'assets', 'style'),
    },
  },
  plugins: [react()],
  css: {
    postcss: {
      plugins: [vw],
    },
  },
  server: {
    host: '0.0.0.0',
  },
})
