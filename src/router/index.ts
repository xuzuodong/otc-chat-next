import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Chat from '../views/Chat.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Chat
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
