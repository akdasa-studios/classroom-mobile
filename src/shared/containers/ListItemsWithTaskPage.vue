<template>
  <list-items-page
    v-slot="sp"
    :items="items"
    :infinite-scroll-enabled="infiniteScrollEnabled"
    :title="title"
    :is-loading="taskWrapper.isInProgress.value"
    @fetch="onListFetchRequested"
    @search="onSearchQueryChanged"
  >
    <slot :item="sp.item" />
  </list-items-page>
</template>


<script setup lang="ts" generic="TModel">
import { Ref, onMounted, ref } from 'vue'
import { useTask } from '@/shared'
import { ITask, GetItemsRequest, GetItemsResponse, ResponseCode } from '@protocol/core'
import { ListItemsPage } from '@/shared'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  task: ITask<GetItemsRequest, GetItemsResponse<TModel>>,
  requestMiddleware: (mode: string, a: GetItemsRequest) => GetItemsRequest,
  fetchCount: number
  title: string
}>()

const emit = defineEmits<{
  search: [
    query: string
  ]
}>()


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const taskWrapper = useTask<GetItemsRequest, GetItemsResponse<TModel>>(
  props.task,
)


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const items = ref<TModel[]>([]) as Ref<TModel[]>
const infiniteScrollEnabled = ref(true)


/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

// TODO: change to the other hook
onMounted(onEntered)

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onEntered() {
  if (items.value.length === 0) {
    onListFetchRequested('append', 0)
  }
}

async function onListFetchRequested(
  mode: 'refresh' | 'append' | 'search',
  offset: number,
  complete?: () => void
) {
  console.log('onListFetchRequested', mode, offset)

  infiniteScrollEnabled.value = true
  const request = props.requestMiddleware(mode, {
    count: props.fetchCount, offset: offset
  })
  const result = await taskWrapper.execute(request)
  if (result.status === ResponseCode.Ok) {
    items.value = offset === 0
      ? result.data.items
      : items.value.concat(result.data.items)

    infiniteScrollEnabled.value = result.data.items.length == props.fetchCount
  }
  console.log('!!!', infiniteScrollEnabled.value)
  if (complete) { complete() }
}

async function onSearchQueryChanged(
  query: string
) {
  items.value = []
  emit('search', query)
  await onListFetchRequested('search', 0)
}
</script>
