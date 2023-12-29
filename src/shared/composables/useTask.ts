import { IAsyncTask, KnownErrorCode, Request, Response } from '@protocol/core'
import { ref } from 'vue';

export function useTask<
  TRequest extends Request,
  TResponse extends Response
> (
  task: IAsyncTask<TRequest, TResponse>
) {

  const lastError    = ref<KnownErrorCode>(KnownErrorCode.NoError);
  const isInProgress = ref(false);

  async function execute(
    request: TRequest
  ): Promise<TResponse> {
    lastError.value = KnownErrorCode.NoError
    isInProgress.value = true

    const result = await task.execute(request)

    if (result.error) {
      lastError.value = result.error.code
    }
    isInProgress.value = false
    return result
  }

  return {
    execute,
    isInProgress,
    lastError
  }
}