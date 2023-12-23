import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

import { routes as educationRoutes } from './education/routes'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/education'
  },
  ...educationRoutes
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
