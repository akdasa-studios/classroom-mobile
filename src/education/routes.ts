import { RouteRecordRaw } from 'vue-router'
import EducationIndexPage from './EducationIndexPage.vue'

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/education',
    component: EducationIndexPage,
    children: [
      {
        path: '',
        redirect: '/education/courses'
      },
      {
        path: 'courses',
        name: 'education',
        component: () => import('./pages/ExplorePage.vue'),
      },
      {
        name: 'course',
        path: 'courses/:id',
        component: () => import('./pages/CourseDetailsPage.vue')
      },
      {
        path: 'my-courses',
        component: () => import('./pages/MyCourses.vue')
      },
    ]
  }
]