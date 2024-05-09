<template>
  <PageWithHeaderLayout
    :title="course?.title || ''"
    :has-data="isReady"
    @sync-completed="fetchCourse"
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
import { useAsyncState } from '@vueuse/core'
import { IonButton, useIonRouter } from '@ionic/vue'
import { Cache, CourseIdentity } from '@/education'
import { CachedImage, PageWithHeaderLayout } from '@/shared'

// --- Interface -------------------------------------------------------------
const props = defineProps<{
  id: CourseIdentity
}>()

// --- Dependencies ----------------------------------------------------------
const router = useIonRouter()

// --- State -----------------------------------------------------------------
const { state: course, isReady, execute: fetchCourse } =
  useAsyncState(async () => await Cache.Courses.get(props.id), undefined)

// --- Handlers --------------------------------------------------------------
function onEnrollButtonClicked() {
  router.push({ name: 'enroll', params: { 'id': props.id.value } })
}
</script>


<fluent locale="en">
enroll = Enroll
</fluent>
