import type { BaseBlockNull, Viewport } from '@/types/edit'
import { defineStore } from 'pinia'

export const useEditStore = defineStore('edit', {
  state: () => ({
    viewport: 'desktop' as Viewport,
    currentSelect: null as BaseBlockNull
  }),
  actions: {
    setViewport(viewport: Viewport) {
      this.viewport = viewport
    },
    setCurrentSelect(component: BaseBlockNull) {
      this.currentSelect = component
    }
  },
  getters: {}
})
