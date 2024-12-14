import { defineStore } from 'pinia'

export const useEditStore = defineStore('edit', {
  state: () => ({
    count: 0
  }),
  actions: {
    increment() {
      this.count++
    }
  },
  getters: {
    doubleCount(state) {
      return state.count * 2
    }
  }
})
