import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'

import { routes as authRoutes } from './auth/routes'
import { routes as educationRoutes } from './education/routes'
import { routes as settingsRoutes } from './settings/routes'
import { routes as messengerRoutes } from './messenger/routes'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/education/courses',
  },
  ...authRoutes,
  ...educationRoutes,
  ...settingsRoutes,
  ...messengerRoutes
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
