import { QueryBuilder } from '@framework/persistence'
import { Lesson, LessonIdentity } from '@/education'


const qb = new QueryBuilder<Lesson>()

export const LessonsById = (lessonIds: LessonIdentity[]) => qb.in('id', lessonIds)
export const OfCourse    = (courseId: string)            => qb.eq('courseId.value', courseId)
