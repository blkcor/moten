import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { createVuePlugin } from 'vite-plugin-vue2'
import { resolve } from 'path'
import { isVue2 } from 'vue-demi'
import dts from 'vite-plugin-dts'

const name = isVue2 ? 'moten-vue2' : 'moten-vue3'
// https://vite.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      vue: isVue2 ? 'vue2' : 'vue3',
      '@': resolve(__dirname, 'src')
    }
  },
  plugins: [isVue2 ? createVuePlugin() : vue(), dts({ tsconfigPath: './tsconfig.app.json' })],
  optimizeDeps: {
    exclude: ['vue-demi']
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "@/assets/style/resources.scss" as *;`
      }
    }
  },
  build: {
    outDir: `dist/${name}`,
    lib: {
      entry: resolve(__dirname, 'src/main.ts'),
      name: 'moten',
      fileName: 'moten'
    },
    rollupOptions: {
      external: ['vue', 'vue-demi'],
      output: {
        globals: {
          // Provide global variable names to replace your external imports
          vue: 'Vue',
          'vue-demi': 'VueDemi'
        }
      }
    }
  }
})
