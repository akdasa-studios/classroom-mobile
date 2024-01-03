import { KnownError, KnownErrorCode, Task, sleep } from '@protocol/core'
import { GetCourseDetailsRequest, GetCourseDetailsResponse } from '@protocol/courses'
import { courses, loremIpsum } from '@protocol/fixtures'


export class GetCourseDetailsTask
  extends Task<
    GetCourseDetailsRequest,
    GetCourseDetailsResponse
  > {
  protected async onWork(
    request: GetCourseDetailsRequest
  ): Promise<GetCourseDetailsResponse> {
    await sleep(1000)

    const course = courses.find(x => x.id === request.id)
    if (!course) {
      throw new KnownError(KnownErrorCode.UnknownError)
    }

    // const isOpenToEnroll = groups.some(x => x.courseId === request.id)

    return {
      item: {
        id: course.id,
        title: course.title,
        subtitle: course.subtitle,
        summary: course.summary,
        description: course.description + loremIpsum + loremIpsum + loremIpsum,
        coverImageUrl: course.coverImageUrl,
      },
    }
  }
}
