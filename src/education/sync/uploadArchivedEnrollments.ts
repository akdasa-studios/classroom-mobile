import { Database, EnrollmentsService } from "@/education"

export async function uploadArchivedEnrollments(
  userId: string,
  authToken: string,
) {
  const enrollmentsService = new EnrollmentsService(authToken)
  const enrollments = (await Database.Enrollments.all()).filter(x => x.isArchived)

  for (const enrollment of enrollments) {
    await enrollmentsService.remove(enrollment.id)
    await Database.Enrollments.delete(enrollment.id)
  }
}
