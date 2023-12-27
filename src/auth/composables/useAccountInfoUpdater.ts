import { useAsyncTaskStateView } from '@/shared/composables/useAsyncTasksStateView';
import { UpdateAccountResponse, UpdateAccountInfoTask } from '@protocol/auth/SignUp';


export function useAccountInfoUpdater() {
  /* -------------------------------------------------------------------------- */
  /*                                 Depenencies                                */
  /* -------------------------------------------------------------------------- */

  const signUpTask = new UpdateAccountInfoTask()


  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  const asyncTasksStatus = useAsyncTaskStateView([
    signUpTask
  ])


  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  async function update(
    name: string,
    phoneNumber: string
  ): Promise<UpdateAccountResponse> {
    return signUpTask.execute({
      name, phoneNumber
    })
  }


  /* -------------------------------------------------------------------------- */
  /*                                  Interface                                 */
  /* -------------------------------------------------------------------------- */

  return {
    update,
    isInProgress: asyncTasksStatus.isInProgress,
    lastErrorCode: asyncTasksStatus.lastErrorCode
  }
}