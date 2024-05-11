<template>
  <PageWithHeaderLayout
    :title="course.title"
    :has-data="isReady"
    @sync-completed="fetchCourse"
  >
    <CachedImage
      :url="course.coverImageUrl"
      loading-height="200px"
    />

    <p class="ion-padding">
      {{ course.summary }}

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
import { useAsyncState } from '@vueuse/core'
import { IonButton, useIonRouter } from '@ionic/vue'
import { Database, EmptyCourse } from '@/education'
import { CachedImage, PageWithHeaderLayout } from '@/shared'

// --- Interface -------------------------------------------------------------
const props = defineProps<{
  id: string
}>()

// --- Dependencies ----------------------------------------------------------
const router = useIonRouter()

// --- State -----------------------------------------------------------------
const { state: course, isReady, execute: fetchCourse } =
  useAsyncState(() => Database.Courses.get(props.id), EmptyCourse(),
  { resetOnExecute: false })

// --- Handlers --------------------------------------------------------------
function onEnrollButtonClicked() {
  router.push({ name: 'enroll', params: { 'id': props.id } })
}
</script>


<fluent locale="en">
enroll = Enroll
</fluent>
