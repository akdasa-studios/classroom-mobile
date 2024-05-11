import { Lesson } from '@/education'
import { QueryBuilder } from '@/shared'


const qb = new QueryBuilder<Lesson>()

export const LessonsById = (lessonIds: string[]) => qb.in('id', lessonIds)
export const OfCourse    = (courseId: string)    => qb.eq('courseId', courseId)
export const OfCourses   = (courseIds: string[]) => qb.in('courseId', courseIds)
