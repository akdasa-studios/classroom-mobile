import { QueryBuilder } from '@classroom/app/shared'
import { Enrollment, Course } from '@classroom/app/education'


const qb = new QueryBuilder<Course>()

export const Courses = (courseIds: string[]) => qb.in('id', courseIds)
export const CoursesRelatedToEnrollments = (r: readonly Enrollment[]) => Courses(r.map(x => x.courseId))
export const CourseWithTitle = (title: string) => qb.contains('title', title)
