import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'

const app = createApp(App)

const vuetify = createVuetify()

app.use(vuetify).use(router)

app.mount('#wrap')
