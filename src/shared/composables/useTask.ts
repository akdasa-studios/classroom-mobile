import { Cache, CompletedResponse, IAsyncTask, KnownErrorCode, Request, Response, ResponseCode } from '@protocol/core'
import { ref } from 'vue'

export function useTask<
  TRequest extends Request,
  TResponse extends Response
> (
  task: IAsyncTask<TRequest, TResponse>,
  cache?: Cache<string, TResponse>
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
    const requestHash = makeHash(request)

    lastError.value = KnownErrorCode.NoError
    isInProgress.value = true

    const hashedResponse = cache?.get(requestHash)
    if (hashedResponse) {
      isInProgress.value = false
      return { status: ResponseCode.Ok, data: hashedResponse }
    }

    const result = await task.execute(request)

    if (result.status === ResponseCode.Ok) {
      cache?.add(requestHash, result.data)
    } else if (result.status === ResponseCode.Error) {
      lastError.value = result.errorCode
    }
    isInProgress.value = false
    return result
  }

  function invalidateCache() {
    cache?.invalidate()
  }

  /* -------------------------------------------------------------------------- */
  /*                                   Helpers                                  */
  /* -------------------------------------------------------------------------- */

  function makeHash(
    request: TRequest
  ) {
    return cyrb53(JSON.stringify(request)).toString()
  }


  function cyrb53(str: string, seed = 0) {
    let h1 = 0xdeadbeef ^ seed, h2 = 0x41c6ce57 ^ seed
    for(let i = 0, ch; i < str.length; i++) {
        ch = str.charCodeAt(i)
        h1 = Math.imul(h1 ^ ch, 2654435761)
        h2 = Math.imul(h2 ^ ch, 1597334677)
    }
    h1  = Math.imul(h1 ^ (h1 >>> 16), 2246822507)
    h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909)
    h2  = Math.imul(h2 ^ (h2 >>> 16), 2246822507)
    h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909)

    return 4294967296 * (2097151 & h2) + (h1 >>> 0)
  }

  /* -------------------------------------------------------------------------- */
  /*                                  Interface                                 */
  /* -------------------------------------------------------------------------- */

  return {
    execute,
    isInProgress,
    lastError,
    invalidateCache
  }
}