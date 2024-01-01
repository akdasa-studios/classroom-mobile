import { GetSignInCodeByEmailRequest, GetSignInCodeByEmailResponse } from '@protocol/auth'
import { AsyncTask, KnownError, KnownErrorCode, sleep } from '@protocol/core'


export class GetSignInCodeByEmailTask
  extends AsyncTask<
    GetSignInCodeByEmailRequest,
    GetSignInCodeByEmailResponse
  >
{
  protected async onWork(
    request: GetSignInCodeByEmailRequest
  ): Promise<GetSignInCodeByEmailResponse> {
    await sleep(1000)

    if (request.email != 'test') {
      throw new KnownError(KnownErrorCode.InvalidEmail)
    }

    return { }
  }
}
