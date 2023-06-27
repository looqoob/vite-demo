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
