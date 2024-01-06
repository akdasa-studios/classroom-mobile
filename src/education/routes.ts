import { RouteRecordRaw } from 'vue-router'
import { EnrollmentIdentity, LessonIdentity } from '@/education'
import { UuidIdentity } from '@framework/domain'

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
        name: 'my-enrollments',
        path: 'my-enrollments',
        component: () => import('./pages/MyEnrollmentsPage.vue')
      },
      {
        name: 'my-enrollment',
        path: 'my-enrollments/:id',
        component: () => import('./pages/MyEnrollmentPage.vue'),
        props: route => ({
          enrollmentId: new UuidIdentity(route.params.id as string) as EnrollmentIdentity,
        }),
      },
      {
        name: 'lesson',
        path: 'lesson/:id',
        component: () => import('./pages/Lessons/LessonPage.vue'),
        props: route => ({
          lessonId: new UuidIdentity(route.params.id as string) as LessonIdentity,
        }),
      },
    ]
  }
]