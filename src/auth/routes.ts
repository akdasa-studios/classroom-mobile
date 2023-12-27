import { RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    name: 'signin',
    path: '/auth/signin',
    component: () => import('./pages/SignInPage.vue')
  },
  {
    name: 'signup',
    path: '/auth/signup',
    component: () => import('./pages/SignUpPage.vue')
  }
]