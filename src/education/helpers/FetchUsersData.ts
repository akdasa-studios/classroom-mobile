import { Repositories, EnrollmentViewModel, HomeworkViewModel, Lesson, OfCourse, OfStudent, OfUser } from '@/education'

export async function FetchEnrollmentsOfUser(
  userId: string
): Promise<EnrollmentViewModel[]> {
  const result = await Repositories.Enrollments.find(OfUser(userId))

  return await Promise.all(
    result.map(async (x) => ({
      enrollment: x,
      group:      x.groupId ? await Repositories.Groups.get(x.groupId) : undefined,
      course:     await Repositories.Courses.get(x.courseId)
    })
  ))
}

export async function FetchHomeworkOfUser(
  userId: string
): Promise<HomeworkViewModel[]> {
  const studentHomeworks = await Repositories.StudentHomeworks.find(OfStudent(userId))

  return await Promise.all(
    studentHomeworks.map(async x => ({
      studentHomework: x,
      lessonSection:   await Repositories.LessonSections.get(x.lessonSectionId),
      lesson:          await Repositories.Lessons.get(
        (await Repositories.LessonSections.get(x.lessonSectionId)).lessonId // TODO
      )
    } as HomeworkViewModel))
  )
}

export async function FetchLessonsOfGroup(
  groupId: string
  // userId: string
): Promise<readonly Lesson[]> {
  const group = await Repositories.Groups.get(groupId)
  const result = await Repositories.Lessons.find(OfCourse(group.courseId))
  return result
}