import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { Quasar } from 'quasar'
import quasarConfig from './plugins/quasar-config'

createApp(App).use(Quasar, quasarConfig).use(router).mount('#app')
