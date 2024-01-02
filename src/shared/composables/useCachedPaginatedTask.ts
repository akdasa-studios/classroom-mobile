import { CachingTask } from '@/shared'
import { Cache, ITask, PaginatedRequest, PaginatedResponse } from '@protocol/core'
import { Network } from '@capacitor/network'


export function useCachedPaginatedTask<
  TCacheModel,
  TCacheQuery,
  TRequest extends PaginatedRequest,
  TResponse extends PaginatedResponse<TCacheModel>
> (
  Task: ITask<TRequest, TResponse>,
  cache: Cache<TCacheModel, TCacheQuery>,
  requestToQuery: (request: TRequest) => TCacheQuery
) {
  Network.addListener('networkStatusChange', status => {
    console.log('Network status changed', status)
    task.useCacheOnly = !status.connected
  })

  const task = new CachingTask(
    Task,
    cache,
    requestToQuery,
    (items: TCacheModel[]) => { return { total: items.length, items } },
    (res) => { return res.items }
  )

  return task
}
