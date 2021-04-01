import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import Chat from '../views/Chat.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: Chat
  },
  
  // {
  //   path: '/about',
  //   name: 'About',
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
