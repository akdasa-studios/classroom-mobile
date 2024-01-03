import { EntitiesCache, IEntitiesCacheRequest, IEntity } from '@/shared'
import { ITask, Request, Response, ResponseCode, Task } from '@protocol/core'

const CachedRequests = new Map<string, number>()

export class CachingTask<
  TCacheModel extends IEntity,
  TCacheRequest extends IEntitiesCacheRequest,
  TRequest extends Request,
  TResponse extends Response
> extends Task<
  TRequest,
  TResponse
> {
  private _useCacheOnly: boolean = false
  private _cacheValidityTime = 10000

  constructor (
    private readonly task: ITask<TRequest, TResponse>,
    private readonly cache: EntitiesCache<TCacheModel, TCacheRequest>,
    private readonly requestToCacheRequest: (request: TRequest) => TCacheRequest,
    private readonly cacheItemsToResponse:  (models:  TCacheModel[]) => TResponse,
    private readonly responseToCacheItems:  (response: TResponse) => TCacheModel[]
  ) {
    super()
  }

  protected async onWork(
    request: TRequest
  ): Promise<TResponse> {
    const cacheRequest         = this.requestToCacheRequest(request)
    const cacheRequestHash     = this.getQueryHash(cacheRequest)
    const cacheRequestValidity = CachedRequests.get(cacheRequestHash) || 0
    const cacheRequestIsValid  = cacheRequestValidity > Date.now()

    // Get data from cache
    if (this._useCacheOnly || cacheRequestIsValid) {
      const entities = await this.cache.get(cacheRequest)
      return this.cacheItemsToResponse(entities)
    }

    // Cache is expired or doen't exist
    const response = await this.task.execute(request)
    if (response.status === ResponseCode.Ok) {
      this.cache.save(this.responseToCacheItems(response.data))
      CachedRequests.set(cacheRequestHash, Date.now() + this._cacheValidityTime)
      return response.data
    }
    throw '222'
  }

  public set useCacheOnly(value: boolean) {
    this._useCacheOnly = value
  }

  invalidate() {
    if (!this._useCacheOnly) { this.cache.invalidate() }
  }

  private getQueryHash(
    request: TCacheRequest, seed = 0
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
