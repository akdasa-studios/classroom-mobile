import { StudentHomework } from '@classroom/app/education'
import { QueryBuilder } from '@classroom/app/shared'


const qb = new QueryBuilder<StudentHomework>()

export const OfStudent = (userId: string)  => qb.eq('userId', userId)
export const OfLessonSections = (lessonSectionIds: string[])  => qb.in('lessonSectionId', lessonSectionIds)
export const OfStudentAndLessonSections = (userId:string, lessonSectionIds: string[]) => qb.and(OfStudent(userId), OfLessonSections(lessonSectionIds))
export const OfStudentAndLessonSection  = (userId:string, lessonSectionId: string) => qb.and(OfStudent(userId), qb.eq('lessonSectionId', lessonSectionId))