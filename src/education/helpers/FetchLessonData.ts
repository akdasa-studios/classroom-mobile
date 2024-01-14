import {
  Cache, LessonSectionIdentity, OfStudentAndLessonSection, LessonSectionBlockState,
  LessonIdentity, OfLesson, LessonSection, StudentHomework, OfStudentAndLessonSections
} from '@/education'

export async function FetchLessonSectionState(
  userId: string,
  lessonSectionId: LessonSectionIdentity
): Promise<LessonSectionBlockState[]> {
  const homeworks = await Cache.StudentHomeworks.find(
    OfStudentAndLessonSection(userId, lessonSectionId)
  )
  if (homeworks.entities.length > 0) {
    return homeworks.entities[0].work || []
  }
  return []
}

export async function FetchLessonSectionsHomeworks(
  userId: string,
  lessonSectionIds: LessonSectionIdentity[]
): Promise<readonly StudentHomework[]> {
  const homeworks = await Cache.StudentHomeworks.find(
    OfStudentAndLessonSections(userId, lessonSectionIds)
  )
  return homeworks.entities
}


export async function FetchLessonSectionHomework(
  userId: string,
  lessonSectionId: LessonSectionIdentity
): Promise<StudentHomework | undefined> {
  const homeworks = await Cache.StudentHomeworks.find(
    OfStudentAndLessonSection(userId, lessonSectionId)
  )
  return homeworks.entities.length > 0 ? homeworks.entities[0] : undefined
}

export async function FetchLessonSections(
  lessonId: LessonIdentity
): Promise<readonly LessonSection[]> {
  const result = await Cache.LessonSections.find(OfLesson(lessonId))
  return result.entities
}
