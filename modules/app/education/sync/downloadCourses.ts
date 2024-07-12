import { Course, CoursesService, Database } from '@classroom/app/education'
import { useConfig } from '@classroom/app/shared'

export async function downloadCourses() {
  const config = useConfig()
  const coursesService = new CoursesService(
    config.baseUrl.value, config.accessToken.value
  )

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