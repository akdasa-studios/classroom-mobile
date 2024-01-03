import { ITask, Request, Response, ResponseCode, Task } from '@protocol/core'

const CachedRequests = new Map<string, number>()

export class CachingTask<
  TRequest extends Request,
  TResponse extends Response
> extends Task<
  TRequest,
  TResponse
> {
  private _useCacheOnly: boolean = false
  private _cacheValidityTime = 10000

  constructor (
    private readonly normalTask: ITask<TRequest, TResponse>,
    private readonly cachedTask: ITask<TRequest, TResponse>,
    private readonly saveToCache: (res: TResponse) => Promise<void>
  ) {
    super()
  }

  protected async onWork(
    request: TRequest
  ): Promise<TResponse> {
    const cacheRequestHash     = this.getQueryHash(request)
    const cacheRequestValidity = CachedRequests.get(cacheRequestHash) || 0
    const cacheRequestIsValid  = cacheRequestValidity > Date.now()
    console.log(request, cacheRequestHash, cacheRequestValidity - Date.now())

    // Get data from cache
    if (this._useCacheOnly || cacheRequestIsValid) {
      const result = await this.cachedTask.execute(request)
      if (result.status === ResponseCode.Ok) {
        return result.data
      }
    }

    // Cache is expired or doen't exist
    const response = await this.normalTask.execute(request)
    if (response.status === ResponseCode.Ok) {
      await this.saveToCache(response.data)
      // this.cache.save(this.responseToCacheItems(response.data))
      CachedRequests.set(cacheRequestHash, Date.now() + this._cacheValidityTime)
      return response.data
    }
    throw '222'
  }

  public set useCacheOnly(value: boolean) {
    this._useCacheOnly = value
  }

  invalidate() {
    if (!this._useCacheOnly) {
      throw new Error('Not yet implemented')
     }
  }

  private getQueryHash(
    request: TRequest, seed = 0
  ): string {
    const str = JSON.stringify(request)
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

    const hashValue = 4294967296 * (2097151 & h2) + (h1 >>> 0)
    return hashValue.toString(16)
  }
}
