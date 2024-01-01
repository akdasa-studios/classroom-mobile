import { AsyncTask, KnownError, KnownErrorCode, sleep } from '@protocol/core'
import { GetCourseDetailsRequest, GetCourseDetailsResponse } from '@protocol/courses'
import { courses, groups, loremIpsum } from '@protocol/fixtures'


export class GetCourseDetailsTaskTask
  extends AsyncTask<
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

    const isOpenToEnroll = groups.some(x => x.courseId === request.id)

    return {
      title: course.title,
      description: course.description + loremIpsum + loremIpsum + loremIpsum,
      coverImageUrl: course.coverImageUrl,
      isOpenToEnroll: isOpenToEnroll
    }
  }
}
