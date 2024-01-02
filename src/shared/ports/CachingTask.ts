import { Task, ITask, ResponseCode, Request, Response } from '@protocol/core'
import { Cache } from '@protocol/core'

export class CachingTask<
  TCacheModel,
  TCacheQuery,
  TRequest extends Request,
  TResponse extends Response
> extends Task<
  TRequest,
  TResponse
> {
  private _useCacheOnly: boolean = false

  constructor (
    private readonly task: ITask<TRequest, TResponse>,
    private readonly cache: Cache<TCacheModel, TCacheQuery>,
    private readonly requestToCacheQuery: (request: TRequest) => TCacheQuery,
    private readonly cacheToResponse: (models: TCacheModel[]) => TResponse,
    private readonly responseToCache: (response: TResponse) => TCacheModel[]
  ) {
    super()
  }

  protected async onWork(
    request: TRequest
  ): Promise<TResponse> {
    const cacheQuery = this.requestToCacheQuery(request)

    const requestHash = this.cache.hash(cacheQuery)
    const requestCached = localStorage.getItem(requestHash)

    // Get data from cache only
    if (this._useCacheOnly || requestCached) {
      const entities = await this.cache.get(cacheQuery)
      return this.cacheToResponse(entities)
    }

    // Cache is expired or doen't exist
    const response = await this.task.execute(request)
    if (response.status === ResponseCode.Ok) {
      this.cache.save(this.responseToCache(response.data))
      localStorage.setItem(requestHash, 'true')
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
}
