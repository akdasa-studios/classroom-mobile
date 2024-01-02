import { UpdateAccountRequest, UpdateAccountResponse } from '@protocol/auth'
import { KnownError, KnownErrorCode, Task, sleep } from '@protocol/core'


export class UpdateAccountTask
  extends Task<
    UpdateAccountRequest,
    UpdateAccountResponse
  >
{
  protected async onWork(
    request: UpdateAccountRequest
  ): Promise<UpdateAccountResponse> {
    await sleep(1000)

    if (!request.name) {
      throw new KnownError(KnownErrorCode.InvalidValue, 'name')
    }

    if (!request.phoneNumber) {
      throw new KnownError(KnownErrorCode.InvalidValue, 'phoneNumber')
    }

    return { }
  }
}
