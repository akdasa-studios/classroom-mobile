<template>
  <PageWithHeaderLayout
    :title="course?.title || ''"
    :has-data="course !== undefined"
  >
    <CachedImage
      :url="course?.coverImageUrl"
      loading-height="200px"
    />

    <p class="ion-padding">
      {{ course?.summary }}

      <IonButton
        expand="block"
        @click="onEnrollButtonClicked"
      >
        {{ $t('enroll') }}
      </IonButton>
    </p>
  </PageWithHeaderLayout>
</template>


<script setup lang="ts">
import { IonButton, onIonViewWillEnter, useIonRouter } from '@ionic/vue'
import { Cache, Course, CourseIdentity, useSyncTask } from '@/education'
import { CachedImage, PageWithHeaderLayout } from '@/shared'
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


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const course = shallowRef<Course>()


/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

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
