import { createApp } from 'vue'
import draggable from 'vuedraggable'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { Icon } from '@iconify/vue'
import '@/assets/main.scss'
import '@moten/ui/style'
import moten from '@moten/ui'

export const pinia = createPinia()

const app = createApp(App)

app.use(pinia)

app.use(router)

app.use(moten)

app.component('Icon', Icon)
app.component('draggable', draggable)

app.mount('#app')
