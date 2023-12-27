import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

import { routes as authRoutes } from './auth/routes'
import { routes as educationRoutes } from './education/routes'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/auth/signin',
  },
  ...authRoutes,
  ...educationRoutes
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
