import { createApp } from 'vue'
import router from './router'
import pinia from './store'
import App from './App.vue'

// TODO: move
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader.js'
import './assets/main.css'
// import './assets/styles/main.css'
loadFonts()

const app       = createApp(App).use(pinia).use(router).use(vuetify).mount('#app')
