import { Database, EnrollmentsService } from "@/education"

export async function uploadSelfDeclinedEnrollments(
  userId: string,
  authToken: string,
) {
  const enrollmentsService = new EnrollmentsService(authToken)
  const enrollments = (await Database.Enrollments.all()).filter(x => x.isDeclinedBy(userId))

  for (const enrollment of enrollments) {
    await enrollmentsService.update(enrollment.id, { status: 'declined' })
    await enrollmentsService.remove(enrollment.id)
    await Database.Enrollments.delete(enrollment.id)
  }
}
