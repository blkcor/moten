import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createVuePlugin } from 'vite-plugin-vue2'
import { resolve } from 'path'
import { isVue2 } from 'vue-demi'

// https://vite.dev/config/
export default defineConfig({
  plugins: [isVue2 ? createVuePlugin() : vue()],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'moten',
      fileName: 'moten',
    },
  },
})
