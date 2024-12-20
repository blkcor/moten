import { defineConfig, mergeConfig } from 'vitest/config'
import viteConfig from './vite.config'
export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      environment: 'jsdom',
      coverage: {
        include: ['src/components/**/*'],
        exclude: ['src/**/schema.ts']
      }
    }
  })
)
