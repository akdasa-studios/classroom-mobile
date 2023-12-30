import { Cache } from '@protocol/core'


export class LocalStorageCache<TItemType>
  implements Cache<string, TItemType> {

  constructor(
    private readonly keyPrefix: string
  ) { }

  add(
    key: string,
    item: TItemType
  ): void {
    localStorage.setItem(
      this.getFullKey(key),
      JSON.stringify(item)
    )
  }

  get(
    key: string,
  ): TItemType | undefined {
    const cachedItem = localStorage.getItem(this.getFullKey(key))
    if (cachedItem) { return JSON.parse(cachedItem) }
    return undefined
  }

  invalidate(): void {
    Object
      .keys(localStorage)
      .filter(x => x.startsWith(this.keyPrefix))
      .forEach(x => localStorage.removeItem(x))
  }

  private getFullKey(
    key: string
  ): string {
    return `${this.keyPrefix}:${key}`
  }
}