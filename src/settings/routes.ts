import { RouteRecordRaw } from 'vue-router'

export const routes: Array<RouteRecordRaw> = [
  {
    name: 'downloads',
    path: '/settings/downloads',
    component: () => import('./pages/DownloadQueue.vue')
  },
]