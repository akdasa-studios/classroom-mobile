import { QueryBuilder } from '@framework/persistence'
import { Enrollment, Course } from '@/education'


const qb = new QueryBuilder<Course>()

export const Courses = (courseIds: string[]) => qb.in('id.value', courseIds)
export const CoursesRelatedToEnrollments = (r: readonly Enrollment[]) => Courses(r.map(x => x.courseId.value))
