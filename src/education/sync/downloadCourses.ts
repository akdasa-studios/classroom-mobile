import { Course, CoursesService, Database } from "@/education"

export async function downloadCourses(
  userId: string,
  authToken: string,
) {
  const coursesService = new CoursesService(authToken)

  console.log('courses')
  const courses = await coursesService.getAll()
  for (const x of courses.items) {
    await Database.Courses.save(new Course(x.id, {
      title: x.title,
      subtitle: x.subtitle,
      summary: x.description,
      coverImageUrl: x.coverImageUrl
    }))
  }
}