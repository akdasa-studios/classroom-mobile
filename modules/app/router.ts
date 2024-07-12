import { createRouter, createWebHistory } from '@ionic/vue-router'
import { RouteRecordRaw } from 'vue-router'

import { routes as authRoutes } from './auth/routes'
import { routes as educationRoutes } from './education/routes'
import { routes as settingsRoutes } from './settings/routes'
import { routes as messengerRoutes } from './messenger/routes'
import { useConfig } from './shared'

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

router.beforeEach((to, from) => {
  const config = useConfig()
  const isAuthenticated = config.accessToken.value
  if (
    !isAuthenticated &&
    to.name !== 'signin'
  ) {
    // redirect the user to the login page
    return { name: 'signin' }
  }
})

export default router
