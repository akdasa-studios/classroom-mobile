import { Database, Enrollment, EnrollmentsService } from "@/education"

export async function downloadEnrollments(
  userId: string,
  authToken: string,
) {
  if (!authToken) { return }

  const enrollmentsService = new EnrollmentsService(authToken)

  console.log('enrollments')
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