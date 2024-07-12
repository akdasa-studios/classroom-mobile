import { Database, EnrollmentsService, UnknownGroupId } from '@classroom/app/education'
import { useConfig } from '@classroom/app/shared'

export async function uploadEnrollments() {
  const config = useConfig()
  const enrollmentsService = new EnrollmentsService(config.baseUrl.value, config.accessToken.value)
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
