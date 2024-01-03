import { CachingTask, EntitiesCache, IEntitiesCacheRequest, IEntity } from '@/shared'
import { GetItemRequest, GetItemResponse, ITask } from '@protocol/core'


export function useGetEntityTask<
  TCacheModel extends IEntity,
  TCacheRequest extends IEntitiesCacheRequest,
  TRequest extends GetItemRequest,
  TResponse extends GetItemResponse<TCacheModel>
> (
  Task: ITask<TRequest, TResponse>,
  cache: EntitiesCache<TCacheModel, TCacheRequest>,
  requestToQuery: (request: TRequest) => TCacheRequest
) {
  const task = new CachingTask(
    Task,
    cache,
    requestToQuery,
    (items: TCacheModel[]) => { return { item: items[0] } },
    (res) => { return [res.item] }
  )

  return task
}
