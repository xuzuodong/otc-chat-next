import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import { Quasar } from 'quasar'
import quasarConfig from './quasar-config'

createApp(App).use(Quasar, quasarConfig).use(router).use(store).mount('#app')
