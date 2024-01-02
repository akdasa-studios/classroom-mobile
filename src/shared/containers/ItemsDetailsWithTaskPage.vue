<template>
  <item-details-page
    :title="title"
    :is-loading="taskWrapper.isInProgress.value"
    :has-padding="hasPadding"
  >
    <slot
      v-if="response && response.status === ResponseCode.Ok"
      name="success"
      :data="response.data"
    />
    <slot
      v-if="response && response.status === ResponseCode.Error"
      name="error"
    />
  </item-details-page>
</template>


<script setup lang="ts" generic="TRequest extends Request, TResponse extends Response">
import { ItemDetailsPage, useTask } from '@/shared'
import { CompletedResponse, ITask, Request, Response, ResponseCode } from '@protocol/core'
import { onMounted, ref } from 'vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  title: string,
  hasPadding?: boolean
  task: ITask<TRequest, TResponse>
  request: TRequest
}>()

const emit = defineEmits<{
  dataLoaded: [response: TResponse],
}>()

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const taskWrapper = useTask(props.task)


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const response = ref<CompletedResponse<TResponse>>()

/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

// TODO: change to the other hook
onMounted(onFetchRequested)

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onFetchRequested() {
  const res = await taskWrapper.execute(props.request)
  response.value = res
  if (res.status === ResponseCode.Ok) {
    emit('dataLoaded', res.data)
  }
}
</script>
