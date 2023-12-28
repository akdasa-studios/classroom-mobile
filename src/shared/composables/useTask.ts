import { IAsyncTask } from '@protocol/core/AsyncTask';
import { KnownErrors } from '@protocol/core/KnownErrors';
import { Request, Response } from '@protocol/core/Requests';
import { ref } from 'vue';

export function useTask<
  TRequest extends Request,
  TResponse extends Response
> (
  task: IAsyncTask<TRequest, TResponse>
) {

  const lastError    = ref<KnownErrors>(KnownErrors.NoError);
  const isInProgress = ref(false);

  async function execute(
    request: TRequest
  ): Promise<TResponse> {
    lastError.value = KnownErrors.NoError
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