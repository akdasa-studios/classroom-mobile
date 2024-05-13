import { Database, EnrollmentsService } from "@/education"
import { useConfig } from "@/shared"

export async function uploadArchivedEnrollments() {
  const config = useConfig()
  const enrollmentsService = new EnrollmentsService(config.baseUrl.value, config.accessToken.value)
  const enrollments = (await Database.Enrollments.all()).filter(x => x.isArchived)

  for (const enrollment of enrollments) {
    await enrollmentsService.remove(enrollment.id)
    await Database.Enrollments.delete(enrollment.id)
  }
}
