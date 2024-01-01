import { AsyncTask, sleep } from '@protocol/core'
import { GetCoursesListRequest, GetCoursesListResponse } from '@protocol/courses'
import { courses } from '@protocol/fixtures'


export class GetCoursesListTask
  extends AsyncTask<
    GetCoursesListRequest,
    GetCoursesListResponse
  > {
  protected async onWork(
    request: GetCoursesListRequest
  ): Promise<GetCoursesListResponse> {
    await sleep(1000)

    const items = courses.filter(
      (_, idx) => idx >= request.offset &&
                  idx <  request.offset + request.count)

    return {
      total: items.length,
      items: items
    }
  }
}
