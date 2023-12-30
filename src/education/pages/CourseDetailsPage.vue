<template>
  <details-page
    :title="title || ''"
    :is-loading="getCourseDetailsTask.isInProgress.value"
  >
    <img
      :src="coverImageUrl"
    >

    {{ description }}
  </details-page>
</template>


<script setup lang="ts">
import { DetailsPage, useLocalStorageCache, useTask } from '@/shared'
import { onIonViewWillEnter } from '@ionic/vue'
import { ResponseCode } from '@protocol/core'
import { GetCourseDetailsTaskTask } from '@protocol/courses'
import { ref } from 'vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  id: string
}>()


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const getCourseDetailsTask = useTask(
  new GetCourseDetailsTaskTask(),
  useLocalStorageCache('course-details')
)

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const title = ref<string>()
const description = ref<string>()
const coverImageUrl = ref<string>()


/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

onIonViewWillEnter(onFetchRequested)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onFetchRequested() {
  const result = await getCourseDetailsTask.execute({ id: props.id })
  if (result.status === ResponseCode.Ok) {
    title.value = result.data.title
    description.value = result.data.description
    coverImageUrl.value = result.data.coverImageUrl
  }
}
</script>
