import { QueryBuilder } from '@framework/persistence'
import { Lesson } from '@/education'


const qb = new QueryBuilder<Lesson>()

export const Lessons  = (lessonIds: string[]) => qb.in('id.value', lessonIds)
export const OfCourse = (courseId: string)    => qb.eq('courseId.value', courseId)
