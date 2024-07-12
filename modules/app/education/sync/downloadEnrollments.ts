import { Database, Enrollment, EnrollmentsService } from '@classroom/app/education'
import { useConfig } from '@classroom/app/shared'

export async function downloadEnrollments() {
  const config = useConfig()
  if (!config.accessToken.value) { return }

  const enrollmentsService = new EnrollmentsService(
    config.baseUrl.value, config.accessToken.value
  )

  const enrollments = await enrollmentsService.getAll()
  for (const e of enrollments.items) {
    await Database.Enrollments.save(new Enrollment(e.id, {
      groupId: e.group?.id,
      courseId: e.course.id,
      status: e.status,
      declinedBy: e.declinedBy,
    }))
  }
}