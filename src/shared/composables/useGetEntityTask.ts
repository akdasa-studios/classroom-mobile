import { CachingTask } from '@/shared'
import { Cache, GetItemRequest, GetItemResponse, ITask } from '@protocol/core'


export function useGetEntityTask<
  TCacheModel,
  TCacheQuery,
  TRequest extends GetItemRequest,
  TResponse extends GetItemResponse<TCacheModel>
> (
  Task: ITask<TRequest, TResponse>,
  cache: Cache<TCacheModel, TCacheQuery>,
  requestToQuery: (request: TRequest) => TCacheQuery
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
