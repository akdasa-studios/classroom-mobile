import { Cache, CourseIdentity, Group, GroupsOfCourse, Course, CourseWithTitle, LessonSectionIdentity, OfStudentAndLessonSection, LessonSectionBlockState, LessonIdentity, OfLesson, LessonSection, StudentHomework } from '@/education'

export async function FetchActiveGroupsOfCourse(
  courseId: CourseIdentity
): Promise<readonly Group[]> {
  const result = await Cache.Groups.find(GroupsOfCourse(courseId.value))
  return result.entities
}

export async function FetchCourses(
  query: string
): Promise<readonly Course[]> {
  const result = await Cache.Courses.find(CourseWithTitle(query))
  return result.entities
}

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