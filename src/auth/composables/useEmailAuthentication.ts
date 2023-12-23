import { ref } from 'vue';
import { RequestSignInCodeTask, SignInTask, RequestSignInCodeResponse, SignInResponse } from '../services/SignInService';
import { AsyncTaskState } from '@/shared';


/**
 * Custom composable for email authentication.
 * @returns An object containing functions and state related to email authentication.
 */
export function useEmailAuthentication() {
  /* -------------------------------------------------------------------------- */
  /*                                 Depenencies                                */
  /* -------------------------------------------------------------------------- */

  const requestSignInCodeTask = new RequestSignInCodeTask({
    stateChanged: onAsyncTaskStateChanged
  })
  const signInTask = new SignInTask({
    stateChanged: onAsyncTaskStateChanged
  })


  /* -------------------------------------------------------------------------- */
  /*                                    State                                   */
  /* -------------------------------------------------------------------------- */

  const isInProgress = ref(false)
  const lastError = ref("")


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
  ): Promise<RequestSignInCodeResponse> {
    return requestSignInCodeTask.execute({
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
  /*                                  Handlers                                  */
  /* -------------------------------------------------------------------------- */

  function onAsyncTaskStateChanged(state: AsyncTaskState) {
    if (state.isInProgress) { lastError.value = "" }
    if (state.error) { lastError.value = state.error.code }
    isInProgress.value = state.isInProgress
  }

  return { requestSignInCode, signIn, requestIsInProgress: isInProgress, lastError }
}