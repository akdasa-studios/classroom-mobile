import { KnownError, KnownErrorCode, Task, sleep } from '@protocol/core'
import { GetCourseDetailsRequest, GetCourseDetailsResponse } from '@protocol/courses'
import { courses, loremIpsum } from '@protocol/fixtures'
import { CoursesCache } from '../caches/CoursesCache'


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

export class GetCourseDetailsFromCacheTask
  extends Task<
    GetCourseDetailsRequest,
    GetCourseDetailsResponse
  > {
  constructor(
    private readonly cache: CoursesCache
  ) {
    super()
  }

  protected async onWork(
    request: GetCourseDetailsRequest
  ): Promise<GetCourseDetailsResponse> {

    const items = await this.cache.get({
      id: request.id,
      offset: 0,
      count: 1,
    })

    return {
      item: {
        id: items[0].id,
        title: items[0].title,
        subtitle: items[0].subtitle,
        summary: items[0].summary,
        description: items[0].description,
        coverImageUrl: items[0].coverImageUrl,
      },
    }
  }
}
