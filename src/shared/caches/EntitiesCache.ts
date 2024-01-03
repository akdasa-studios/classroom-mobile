import { LocalStorageService } from '@/shared'

export interface IEntity {
  id: string
}

export interface ICache<
  TModel,
  TRequest
> {
  get(request: TRequest): Promise<TModel[]>
  save(items: TModel[]): void
  invalidate(): void
}

export abstract class LocalStorageCache<
  TEntity extends IEntity,
  TCacheRequest
> implements ICache <
  TEntity,
  TCacheRequest
>{
  private _entities    = new Map<string, TEntity>()
  private _initialized = false

  constructor(
    private readonly _key: string,
    private readonly _localStorage: LocalStorageService
  ) {
  }

  async get(
    query: TCacheRequest
  ): Promise<TEntity[]> {
    await this.initializeCache()

    return this.filter(
      Array.from(this._entities.values()),
      query
    )
  }

  async save(
    items: (Partial<TEntity> & IEntity)[]
  ) {
    await this.initializeCache()

    items.forEach(item => this._entities.set(item.id, item as TEntity))
    this._localStorage.set(
      this._key,
      Array.from(this._entities.entries())
    )
  }

  protected abstract filter(items: TEntity[], query: TCacheRequest): TEntity[]

  invalidate(): void {
    localStorage.clear()
  }

  private async initializeCache() {
    if (this._initialized) { return }
    const cached = await this._localStorage.get(this._key)
    this._entities = new Map<string, TEntity>(cached || [])
    this._initialized = true
  }
}
