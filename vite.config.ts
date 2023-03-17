import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from "url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
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
