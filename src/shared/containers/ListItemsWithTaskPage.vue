<template>
  <list-items-page
    v-slot="sp"
    :items="items"
    :infinite-scroll-enabled="infiniteScrollEnabled"
    :title="title"
    :is-loading="taskWrapper.isInProgress.value"
    @fetch="onCoursesListFetchRequested"
  >
    <slot :item="sp.item" />
  </list-items-page>
</template>

<script setup lang="ts" generic="TModel">
import { Ref, onMounted, ref } from 'vue'
import { useLocalStorageCache, useTask } from '@/shared'
import { IAsyncTask, PaginatedRequest, PaginatedResponse, ResponseCode } from '@protocol/core'
import { ListItemsPage } from '@/shared'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  task: IAsyncTask<PaginatedRequest, PaginatedResponse<TModel>>,
  fetchCount: number
  title: string
}>()

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const taskWrapper = useTask<PaginatedRequest, PaginatedResponse<TModel>>(
  props.task,
  useLocalStorageCache('courses')
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
    onCoursesListFetchRequested('append', 0)
  }
}

async function onCoursesListFetchRequested(
  mode: 'refresh' | 'append',
  offset: number,
  complete?: () => void
) {
  if (mode === 'refresh') { taskWrapper.invalidateCache() }

  const result = await taskWrapper.execute({
    count: props.fetchCount, offset: offset
  })
  if (result.status === ResponseCode.Ok) {
    items.value = offset === 0
      ? result.data.items
      : items.value.concat(result.data.items)
    infiniteScrollEnabled.value = result.data.items.length == props.fetchCount
  }
  if (complete) { complete() }
}
</script>
