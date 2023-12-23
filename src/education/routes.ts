import { RouteRecordRaw } from 'vue-router'
import EducationIndexPage from './EducationIndexPage.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/education',
    component: EducationIndexPage,
    children: [
      {
        path: '',
        redirect: '/education/explore'
      },
      {
        path: 'explore',
        name: 'education',
        component: () => import('./pages/ExplorePage.vue')
      },
      {
        path: 'my-courses',
        component: () => import('./pages/MyCourses.vue')
      },
    ]
  }
]