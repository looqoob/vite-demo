import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": path.resolve("./src"),
    },
  },
  // 配置代理跨域
  server: {
    open: false,
    proxy: {
      '/api': {
        target: 'http://syt.atguigu.cn',
        changeOrigin: true
      }
    }
  },
  css:{
    preprocessorOptions:{
      less:{
        javascriptEnabled: true,
      }
    }
  }
})

// import { defineConfig } from 'vite'
// import vue from '@vitejs/plugin-vue'
// import Electron from 'vite-plugin-electron'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [vue(),Electron({
//     entry: 'electron/index.ts'
//   })],
// })
