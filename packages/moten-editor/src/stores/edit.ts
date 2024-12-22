import type { BaseBlock, BaseBlockNull, Viewport } from '@/types/edit'
import { defineStore } from 'pinia'

export const useEditStore = defineStore('edit', {
  state: () => ({
    viewport: 'desktop' as Viewport,
    blockConfig: [] as BaseBlock[],
    currentSelect: null as BaseBlockNull,
    configPanelShow: false
  }),
  actions: {
    setViewport(viewport: Viewport) {
      this.viewport = viewport
    },
    setCurrentSelect(component: BaseBlockNull) {
      this.currentSelect = component
    },
    setConfigPanelShow(show: boolean) {
      this.configPanelShow = show
    },
    setBlockConfig(config: BaseBlock[]) {
      this.blockConfig = config
    }
  },
  getters: {
    isMobileViewport(state) {
      return state.viewport === 'mobile'
    }
  }
})
