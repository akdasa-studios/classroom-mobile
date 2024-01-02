import { CompletedResponse, ITask, KnownErrorCode, Request, Response, ResponseCode } from '@protocol/core'
import { ref } from 'vue'

export function useTask<
  TRequest extends Request,
  TResponse extends Response
> (
  task: ITask<TRequest, TResponse>,
) {
  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  const lastError    = ref<KnownErrorCode>(KnownErrorCode.NoError)
  const isInProgress = ref(false)


  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  async function execute(
    request: TRequest
  ): Promise<CompletedResponse<TResponse>> {
    lastError.value = KnownErrorCode.NoError
    isInProgress.value = true

    const result = await task.execute(request)

    if (result.status === ResponseCode.Error) {
      lastError.value = result.errorCode
    }
    isInProgress.value = false
    return result
  }


  /* -------------------------------------------------------------------------- */
  /*                                  Interface                                 */
  /* -------------------------------------------------------------------------- */

  return {
    execute,
    isInProgress,
    lastError,
  }
}