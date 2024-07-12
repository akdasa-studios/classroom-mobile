import { LessonSection } from '@classroom/app/education'
import { QueryBuilder } from '@classroom/app/shared'


const qb = new QueryBuilder<LessonSection>()


export const LessonSectionsById = (ids: string[]) => qb.in('id', ids)
export const OfLesson           = (lessonId: string)     => qb.eq('lessonId', lessonId)
export const OfLessons          = (lessonIds: string[])  => qb.in('lessonId', lessonIds)
