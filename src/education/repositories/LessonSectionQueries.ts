import { QueryBuilder } from '@framework/persistence'
import { LessonIdentity, LessonSectionIdentity, LessonSection } from '@/education'


const qb = new QueryBuilder<LessonSection>()


export const LessonSectionsById = (ids: LessonSectionIdentity[]) => qb.in('id', ids)
export const OfLesson           = (lessonId: LessonIdentity)     => qb.eq('lessonId', lessonId)