import { Course, Enrollment, Group } from '@/education'

export interface EnrollmentViewModel {
  enrollment: Enrollment,
  group?: Group,
  course: Course
}
