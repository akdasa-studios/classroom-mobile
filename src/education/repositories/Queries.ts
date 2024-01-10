import { Cache, OfUser, EnrollmentViewModel, HomeworkViewModel, OfStudent, CourseIdentity, Group, GroupsOfCourse, Course, CourseWithTitle } from '@/education'

export async function FetchEnrollmentsOfUser(
  userId: string
): Promise<EnrollmentViewModel[]> {
  const result = await Cache.Enrollments.find(OfUser(userId))

  return await Promise.all(
    result.entities.map(async (x) => ({
      enrollment: x,
      group:      x.groupId ? await Cache.Groups.get(x.groupId) : undefined,
      course:     await Cache.Courses.get(x.courseId)
    } as EnrollmentViewModel)
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
