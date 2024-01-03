import { LocalStorageService } from '@/shared'

export interface IEntity {
  id: string
}

export interface IEntitiesCacheRequest {
  id?: string,
  offset?: number,
  count?: number
}

export abstract class EntitiesCache<
  TEntity extends IEntity,
  TCacheRequest extends IEntitiesCacheRequest
> {
  private _entities    = new Map<string, TEntity>()
  private _initialized = false

  constructor(
    private readonly _key: string,
    private readonly _localStorage: LocalStorageService
  ) {
  }

  async get(
    request: TCacheRequest
  ): Promise<TEntity[]> {
    await this.initializeCache()

    // check if specified item is requested
    if (request.id) {
      const item = this._entities.get(request.id)
      return item ? [item] : []
    }

    let items = this.filter(
      Array.from(this._entities.values()),
      request
    )

    if (request.offset && request.count) {
      items = items.filter((_, idx) =>
        idx >= (request.offset || 0) &&
        idx <  (request.offset || 0) + (request.count || 0))
    }
    return items
  }

  async save(
    items: TEntity[]
  ) {
    await this.initializeCache()

    items.forEach(item => this._entities.set(item.id, item))
    this._localStorage.set(
      this._key,
      Array.from(this._entities.entries())
    )
  }

  protected abstract filter(
    items: TEntity[], request: TCacheRequest
  ): TEntity[]

  invalidate(): void {
    localStorage.removeItem(this._key)
  }

  private async initializeCache() {
    if (this._initialized) { return }
    const cached = await this._localStorage.get(this._key)
    this._entities = new Map<string, TEntity>(cached || [])
    this._initialized = true
  }
}
