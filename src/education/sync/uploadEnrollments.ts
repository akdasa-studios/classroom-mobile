import { Database, EnrollmentsService, UnknownGroupId } from "@/education"

export async function uploadEnrollments(
  userId: string,
  authToken: string,
) {
  const enrollmentsService = new EnrollmentsService(authToken)
  const enrollments = (await Database.Enrollments.all()).filter(x => x.isNotSubmitted)

  for (const enrollment of enrollments) {
    await enrollmentsService.create({
      id: enrollment.id,
      groupId: enrollment.groupId !== UnknownGroupId ? enrollment.groupId : undefined,
      courseId: enrollment.courseId,
    })
    enrollment.submit()
    await Database.Enrollments.save(enrollment)
  }
}
