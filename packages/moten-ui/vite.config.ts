import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createVuePlugin } from 'vite-plugin-vue2'
import { resolve } from 'path'
import { isVue2 } from 'vue-demi'

const name = isVue2 ? 'moten-vue2' : 'moten-vue3'
// https://vite.dev/config/
export default defineConfig({
  plugins: [isVue2 ? createVuePlugin() : vue()],
  build: {
    outDir: `dist/${name}`,
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'moten',
      fileName: 'moten',
    },
  },
})
