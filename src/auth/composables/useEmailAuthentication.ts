import { useAsyncTaskStateView } from '@/shared/composables/useAsyncTasksStateView';
import { GetSignInCodeResponse, GetSignInCodeTask, SignInResponse, SignInTask } from '@protocol/auth/SignIn';


/**
 * Custom composable for email authentication.
 * @returns An object containing functions and state related to email authentication.
 */
export function useEmailAuthentication() {
  /* -------------------------------------------------------------------------- */
  /*                                 Depenencies                                */
  /* -------------------------------------------------------------------------- */

  const getSignInCodeTask = new GetSignInCodeTask()
  const signInTask = new SignInTask()
  const asyncTasksStatus = useAsyncTaskStateView([
    getSignInCodeTask, signInTask
  ])


  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */



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

  return { requestSignInCode, signIn, isInProgress: asyncTasksStatus.isInProgress, lastErrorCode: asyncTasksStatus.lastErrorCode }
}