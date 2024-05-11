import { LessonSection } from '@/education'
import { QueryBuilder } from '@/shared'


const qb = new QueryBuilder<LessonSection>()


export const LessonSectionsById = (ids: string[]) => qb.in('id', ids)
export const OfLesson           = (lessonId: string)     => qb.eq('lessonId', lessonId)
export const OfLessons          = (lessonIds: string[])  => qb.in('lessonId', lessonIds)
