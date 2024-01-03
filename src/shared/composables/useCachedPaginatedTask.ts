import { CachingTask, EntitiesCache, IEntitiesCacheRequest, IEntity } from '@/shared'
import { ITask, GetItemsRequest, GetItemsResponse } from '@protocol/core'

export function useCachedPaginatedTask<
  TCacheModel extends IEntity,
  TCacheRequest extends IEntitiesCacheRequest,
  TRequest extends GetItemsRequest,
  TResponse extends GetItemsResponse<TCacheModel>
> (
  Task: ITask<TRequest, TResponse>,
  cache: EntitiesCache<TCacheModel, TCacheRequest>,
  requestToQuery: (request: TRequest) => TCacheRequest
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
