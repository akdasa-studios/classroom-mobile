import { KnownError, KnownErrorCode, sleep } from '@protocol/core'
import { SubmitEnrolmentFormRequest, SubmitEnrolmentFormResponse } from '@protocol/courses'


export class EnrollmentService {
  public async submit(
    request: SubmitEnrolmentFormRequest
  ): Promise<SubmitEnrolmentFormResponse> {
    await sleep(1000)

    if (!request.timeBlocks) {
      throw new KnownError(KnownErrorCode.UnknownError)
    }

    return { }
  }
}
