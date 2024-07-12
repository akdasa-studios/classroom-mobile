import {
  Database, OfStudentAndLessonSection, LessonSectionBlockState,
  OfLesson, LessonSection, StudentHomework, OfStudentAndLessonSections
} from '@classroom/app/education'

export async function FetchLessonSectionState(
  userId: string,
  lessonSectionId: string,
): Promise<LessonSectionBlockState[]> {
  const homeworks = await Database.StudentHomeworks.find(
    OfStudentAndLessonSection(userId, lessonSectionId)
  )
  if (homeworks.length > 0) {
    return homeworks[0].work || []
  }
  return []
}

export async function FetchLessonSectionsHomeworks(
  userId: string,
  lessonSectionIds: string[]
): Promise<readonly StudentHomework[]> {
  return await Database.StudentHomeworks.find(
    OfStudentAndLessonSections(userId, lessonSectionIds)
  )
}


export async function FetchLessonSectionHomework(
  userId: string,
  lessonSectionId: string
): Promise<StudentHomework | undefined> {
  const homeworks = await Database.StudentHomeworks.find(
    OfStudentAndLessonSection(userId, lessonSectionId)
  )
  return homeworks.length > 0 ? homeworks[0] : undefined
}

export async function FetchLessonSections(
  lessonId: string
): Promise<readonly LessonSection[]> {
  const result = await Database.LessonSections.find(OfLesson(lessonId))
  return result
}
