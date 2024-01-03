import { CachingTask } from '@/shared'
import { Cache, ITask, GetItemsRequest, GetItemsResponse } from '@protocol/core'


export function useCachedPaginatedTask<
  TCacheModel,
  TCacheQuery,
  TRequest extends GetItemsRequest,
  TResponse extends GetItemsResponse<TCacheModel>
> (
  Task: ITask<TRequest, TResponse>,
  cache: Cache<TCacheModel, TCacheQuery>,
  requestToQuery: (request: TRequest) => TCacheQuery
) {

  const task = new CachingTask(
    Task,
    cache,
    requestToQuery,
    (items: TCacheModel[]) => { return { total: items.length, items } },
    (res) => { return res.items }
  )

  return task
}
