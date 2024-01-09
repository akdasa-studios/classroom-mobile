import { QueryBuilder } from '@framework/persistence'
import { CourseIdentity, Lesson, LessonIdentity } from '@/education'


const qb = new QueryBuilder<Lesson>()

export const LessonsById = (lessonIds: LessonIdentity[]) => qb.in('id', lessonIds)
export const OfCourse    = (courseId: string)            => qb.eq('courseId.value', courseId)
export const OfCourses   = (courseIds: CourseIdentity[]) => qb.in('courseId', courseIds)
