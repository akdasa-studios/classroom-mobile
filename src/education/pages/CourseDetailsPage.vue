<template>
  <PageWithHeaderLayout
    :title="course?.title || ''"
    :busy="syncTask.busy.value && !course"
  >
    <img :src="course?.coverImageUrl">

    <p class="ion-padding">
      {{ course?.summary }}

      <ion-button
        expand="block"
        @click="onEnrollButtonClicked"
      >
        {{ $t('enroll') }}
      </ion-button>
    </p>
  </PageWithHeaderLayout>
</template>


<script setup lang="ts">
import { IonButton, onIonViewWillEnter, useIonRouter } from '@ionic/vue'
import { Cache, Course, CourseIdentity, useSyncTask } from '@/education'
import { PageWithHeaderLayout } from '@/shared'
import { shallowRef, watch } from 'vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  id: CourseIdentity
}>()


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const router = useIonRouter()
const syncTask = useSyncTask()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const course = shallowRef<Course>()


/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

watch(syncTask.completedAt, onFetchData)
onIonViewWillEnter(onFetchData)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onEnrollButtonClicked() {
  router.push({ name: 'enroll', params: { 'id': props.id.value } })
}

async function onFetchData() {
  course.value = await Cache.Courses.get(props.id)
}
</script>


<fluent locale="en">
enroll = Enroll
</fluent>
