import { RouteRecordRaw } from 'vue-router'
import SignInPage from './pages/SignInPage.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/auth',
    component: SignInPage,
  }
]