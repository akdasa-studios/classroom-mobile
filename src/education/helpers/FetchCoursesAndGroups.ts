import {
  Cache, CourseIdentity, Group, GroupsOfCourse, Course, CourseWithTitle
} from '@/education'

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
