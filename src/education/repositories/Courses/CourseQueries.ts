import { QueryBuilder } from '@/shared/ports/PouchDb/PouchRepositoryLight'
import { Enrollment, Course } from '@/education'


const qb = new QueryBuilder<Course>()

export const Courses = (courseIds: string[]) => qb.in('_id', courseIds)
export const CoursesRelatedToEnrollments = (r: readonly Enrollment[]) => Courses(r.map(x => x.courseId))
export const CourseWithTitle = (title: string) => qb.contains('title', title)
