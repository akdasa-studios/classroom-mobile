import {
  Database, Group, GroupsOfCourse, Course, CourseWithTitle
} from '@classroom/app/education'

export async function FetchActiveGroupsOfCourse(
  courseId: string,
): Promise<readonly Group[]> {
  const result = await Database.Groups.find(GroupsOfCourse(courseId))
  return result
}

export async function FetchCourses(
  query: string
): Promise<Course[]> {
  return await Database.Courses.find(CourseWithTitle(query))
}
