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
        component: () => import('./pages/CoursesListPage.vue'),
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
        name: 'enroll-completed',
        path: 'courses/:id/enroll/completed',
        component: () => import('./pages/EnrollCompletedPage.vue'),
        props: route => ({
          id: route.params.id,
        }),
      },
      {
        name: 'my-groups',
        path: 'my-groups',
        component: () => import('./pages/MyCourses.vue')
      },
      {
        name: 'my-group',
        path: 'my-group/:id',
        component: () => import('./pages/MyGroup.vue')
      },
    ]
  }
]