import {
  Repositories, Group, GroupsOfCourse, Course, CourseWithTitle
} from '@/education'

export async function FetchActiveGroupsOfCourse(
  courseId: string,
): Promise<readonly Group[]> {
  const result = await Repositories.Groups.find(GroupsOfCourse(courseId))
  return result
}

export async function FetchCourses(
  query: string
): Promise<readonly Course[]> {
  return await Repositories.Courses.find(CourseWithTitle(query))
}
