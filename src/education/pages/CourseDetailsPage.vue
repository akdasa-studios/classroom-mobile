<template>
  <item-details-with-task-page
    :title="title"
    :task="getCourseDetailsTask"
    :request="{ id: props.id }"
    @data-loaded="onDataLoaded"
  >
    <template #success="{ data }">
      <img :src="data.coverImageUrl">

      <p class="ion-padding">
        {{ data.description }}

        <ion-button
          :disabled="!data.isOpenToEnroll"
          expand="block"
          @click="onEnrollButtonClicked"
        >
          {{ $t('enroll') }}
        </ion-button>
      </p>
    </template>

    <template #error>
      Some shit happened
    </template>
  </item-details-with-task-page>
</template>


<script setup lang="ts">
import { IonButton, useIonRouter } from '@ionic/vue'
import { ItemDetailsWithTaskPage } from '@/shared'
import { GetCourseDetailsResponse, GetCourseDetailsTaskTask } from '@protocol/courses'
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

const router = useIonRouter()
const getCourseDetailsTask = new GetCourseDetailsTaskTask()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const title = ref('')


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onEnrollButtonClicked() {
  router.push({ name: 'enroll', params: { 'id': props.id } })
}

function onDataLoaded(response: GetCourseDetailsResponse) {
  title.value = response.title
}
</script>


<fluent locale="en">
enroll = Enroll
</fluent>