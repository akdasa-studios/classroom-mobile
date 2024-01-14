import { RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    name: 'messenger',
    path: '/messenger',
    component: () => import('./pages/MessengerPage.vue')
  },
]