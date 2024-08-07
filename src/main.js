import './assets/main.css'
import router from './router'
import { createApp, markRaw } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

const pinia = createPinia()
const app =  createApp(App)

pinia.use(({store}) => {
    store.router = markRaw(router)
})

app.use(pinia)
app.use(router)
app.mount('#app')
 