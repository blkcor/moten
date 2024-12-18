import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { Icon } from '@iconify/vue'
import '@/assets/main.scss'
export const pinia = createPinia()

const app = createApp(App)

app.use(pinia)

app.use(router)

app.component('icon', Icon)

app.mount('#app')
