import { Cache, EnrollmentViewModel, GroupIdentity, HomeworkViewModel, Lesson, OfCourse, OfStudent, OfUser } from '@/education'

export async function FetchEnrollmentsOfUser(
  userId: string
): Promise<EnrollmentViewModel[]> {
  const result = await Cache.Enrollments.find(OfUser(userId))

  return await Promise.all(
    result.entities.map(async (x) => ({
      enrollment: x,
      group:      x.groupId ? await Cache.Groups.get(x.groupId) : undefined,
      course:     await Cache.Courses.get(x.courseId)
    })
  ))
}

export async function FetchHomeworkOfUser(
  userId: string
): Promise<HomeworkViewModel[]> {
  const studentHomeworks = await Cache.StudentHomeworks.find(OfStudent(userId))

  return await Promise.all(
    studentHomeworks.entities.map(async x => ({
      studentHomework: x,
      lessonSection:   await Cache.LessonSections.get(x.lessonSectionId),
      lesson:          await Cache.Lessons.get(
        (await Cache.LessonSections.get(x.lessonSectionId)).lessonId // TODO
      )
    } as HomeworkViewModel))
  )
}

export async function FetchLessonsOfGroup(
  groupId: GroupIdentity,
  // userId: string
): Promise<readonly Lesson[]> {
  const group = await Cache.Groups.get(groupId)
  const result = await Cache.Lessons.find(OfCourse(group.courseId.value))
  return result.entities
}