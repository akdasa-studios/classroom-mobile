import { QueryBuilder } from '@framework/persistence'
import { LessonIdentity } from '@/education'
import { LessonSection } from '../aggregates/LessonSection'


const qb = new QueryBuilder<LessonSection>()

export const OfLesson = (lessonId: LessonIdentity) => qb.eq('lessonId', lessonId)
