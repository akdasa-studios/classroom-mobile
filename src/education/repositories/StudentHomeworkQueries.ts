import { QueryBuilder } from '@framework/persistence'
import { StudentHomework } from '../aggregates/StudentHomework'
import { LessonSectionIdentity } from '../aggregates/LessonSection'


const qb = new QueryBuilder<StudentHomework>()

export const OfStudent = (userId: string)  => qb.eq('userId', userId)
export const OfLessonSections = (lessonSectionIds: LessonSectionIdentity[])  => qb.in('lessonSectionId', lessonSectionIds)
export const OfStudentAndLessonSections = (userId:string, lessonSectionIds: LessonSectionIdentity[]) => qb.and(OfStudent(userId), OfLessonSections(lessonSectionIds))
export const OfStudentAndLessonSection  = (userId:string, lessonSectionId: LessonSectionIdentity) => qb.and(OfStudent(userId), qb.eq('lessonSectionId', lessonSectionId))