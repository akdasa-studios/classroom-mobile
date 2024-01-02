import { KnownError, KnownErrorCode, Task, sleep } from '@protocol/core'
import { GetEnrollmentDetailsRequest, GetEnrollmentDetailsResponse } from '@protocol/courses'
import { courses, groups } from '@protocol/fixtures'


export class GetEnrollmentDetailsTask
  extends Task<
    GetEnrollmentDetailsRequest,
    GetEnrollmentDetailsResponse
  > {
  protected async onWork(
    request: GetEnrollmentDetailsRequest
  ): Promise<GetEnrollmentDetailsResponse> {
    await sleep(1000)

    const course = courses.find(x => x.id === request.courseId)
    if (!course) {
      throw new KnownError(KnownErrorCode.UnknownError)
    }

    const re = groups.filter(x => x.courseId === request.courseId)

    return {
      groups: re
    }
  }
}
