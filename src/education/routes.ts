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
        name: 'courses',
        component: () => import('./pages/CoursesIndexPage.vue'),
      },
      {
        name: 'course',
        path: 'courses/:id',
        component: () => import('./pages/CourseDetailsPage.vue'),
        props: route => ({
          id: route.params.id,
        }),
      },
      {
        name: 'enroll',
        path: 'courses/:id/enroll',
        component: () => import('./pages/EnrollPage.vue'),
        props: route => ({
          id: route.params.id,
        }),
      },
      {
        path: 'my-courses',
        component: () => import('./pages/MyCourses.vue')
      },
    ]
  }
]