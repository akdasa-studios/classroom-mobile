import { Database, EnrollmentViewModel, HomeworkViewModel, Lesson, OfCourse, OfStudent } from '@/education'

export async function FetchEnrollmentsOfUser(
  userId: string
): Promise<EnrollmentViewModel[]> {
  const result = await Database.Enrollments.all()

  return await Promise.all(
    result.map(async (x) => ({
      enrollment: x,
      group:      x.groupId ? await Database.Groups.get(x.groupId) : undefined,
      course:     await Database.Courses.get(x.courseId)
    })
  ))
}

export async function FetchHomeworkOfUser(
  userId: string
): Promise<HomeworkViewModel[]> {
  const studentHomeworks = await Database.StudentHomeworks.find(OfStudent(userId))

  return await Promise.all(
    studentHomeworks.map(async x => ({
      studentHomework: x,
      lessonSection:   await Database.LessonSections.get(x.lessonSectionId),
      lesson:          await Database.Lessons.get(
        (await Database.LessonSections.get(x.lessonSectionId)).lessonId // TODO
      )
    } as HomeworkViewModel))
  )
}

export async function FetchLessonsOfGroup(
  groupId: string
  // userId: string
): Promise<readonly Lesson[]> {
  const group = await Database.Groups.get(groupId)
  const result = await Database.Lessons.find(OfCourse(group.courseId))
  return result
}