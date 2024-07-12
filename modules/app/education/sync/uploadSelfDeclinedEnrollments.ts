import { Database, EnrollmentsService } from "@classroom/app/education"
import { useConfig } from "@classroom/app/shared"

export async function uploadSelfDeclinedEnrollments() {
  const config = useConfig()
  const enrollmentsService = new EnrollmentsService(config.baseUrl.value, config.accessToken.value)
  const enrollments = (await Database.Enrollments.all()).filter(x => x.isDeclinedBy(config.userId.value))

  for (const enrollment of enrollments) {
    await enrollmentsService.update(enrollment.id, { status: 'declined' })
    await enrollmentsService.remove(enrollment.id)
    await Database.Enrollments.delete(enrollment.id)
  }
}
