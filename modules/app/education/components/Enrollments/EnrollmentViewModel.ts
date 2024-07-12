import { Course, Enrollment, Group } from '@classroom/app/education'

export interface EnrollmentViewModel {
  enrollment: Enrollment,
  group?: Group,
  course: Course
}
