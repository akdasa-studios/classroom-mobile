import { LocalStorageCache } from '../ports/LocalStorageCache'

export function useLocalStorageCache<TItemType>(prefix: string) {
  return new LocalStorageCache<TItemType>(prefix)
}