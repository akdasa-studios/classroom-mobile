import { RouteRecordRaw } from 'vue-router'
import AuthIndexPage from './pages/AuthIndexPage.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/auth',
    component: AuthIndexPage,
    children: [
      {
        name: 'signin',
        path: '',
        component: () => import('./pages/SignInPage.vue')
      },
      {
        name: 'signup',
        path: '/auth/signup',
        component: () => import('./pages/SignUpPage.vue')
      }
    ]
  },
]