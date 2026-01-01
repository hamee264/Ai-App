import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import './assets/css/main.css'

createApp(App)
  .use(createPinia())
  .use(router)
  .mount('#app')
import App from './App.vue'