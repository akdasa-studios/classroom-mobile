import { useAsyncTaskStateView } from '@/shared/composables/useAsyncTasksStateView';
import { GetSignInCodeResponse, GetSignInWithEmailCodeTask, SignInResponse, SignInWithEmailTask } from '@protocol/auth/SignIn';


export function useEmailAuthentication() {
  /* -------------------------------------------------------------------------- */
  /*                                 Depenencies                                */
  /* -------------------------------------------------------------------------- */

  const getSignInCodeTask = new GetSignInWithEmailCodeTask()
  const signInTask = new SignInWithEmailTask()

  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  const asyncTasksStatus = useAsyncTaskStateView([
    getSignInCodeTask, signInTask
  ])


  /* -------------------------------------------------------------------------- */
  /*                                   Actions                                  */
  /* -------------------------------------------------------------------------- */

  /**
   * Requests a sign-in code for the specified email.
   * @param email The email address to request the sign-in code for.
   * @returns A promise that resolves to a RequestSignInCodeResponse object.
   */
  async function requestSignInCode(
    email: string
  ): Promise<GetSignInCodeResponse> {
    return getSignInCodeTask.execute({
      email: email
    })
  }

  /**
   * Signs in the user with the provided code.
   * @param code The code used for authentication.
   * @returns A promise that resolves to a SignInResponse.
   */
  async function signIn(
    code: string
  ): Promise<SignInResponse> {
    return signInTask.execute({
      code: code
    })
  }


  /* -------------------------------------------------------------------------- */
  /*                                  Interface                                 */
  /* -------------------------------------------------------------------------- */

  return {
    requestSignInCode,
    signIn,
    isInProgress: asyncTasksStatus.isInProgress,
    lastErrorCode: asyncTasksStatus.lastErrorCode
  }
}