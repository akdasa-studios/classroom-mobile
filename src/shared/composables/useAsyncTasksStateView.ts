import { AsyncTask, AsyncTaskState } from "@protocol/core/AsyncTask";
import { KnownErrors } from "@protocol/core/KnownErrors";
import { Request, Response } from "@protocol/core/Requests";
import { ref } from "vue";

export function useAsyncTaskStateView(
  tasks: Array<AsyncTask<Request, Response>>
) {

  for (const task of tasks) {
    task.subscribeStateChanged(onAsyncTaskStateChanged)
  }

  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  const isInProgress = ref(false)
  const lastErrorCode = ref<KnownErrors>(KnownErrors.NoError)


  /* -------------------------------------------------------------------------- */
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  function onAsyncTaskStateChanged(
    state: AsyncTaskState
  ) {
    if (state.isInProgress) { lastErrorCode.value = KnownErrors.NoError }
    if (state.error) { lastErrorCode.value = state.error.code }
    isInProgress.value = state.isInProgress
  }

  return { isInProgress, lastErrorCode }
}