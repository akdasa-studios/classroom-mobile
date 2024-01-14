<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>{{ title }}</IonTitle>
        <IonButtons slot="start">
          <IonBackButton />
        </IonButtons>
        <IonButtons slot="secondary">
          <SyncIcon
            v-if="busy"
            @click="onDownloadingIndicatorCkicked"
          />
        </IonButtons>
      </IonToolbar>
      <slot name="toolbar" />
    </IonHeader>

    <IonContent
      :fullscreen="true"
      :class="{
        'ion-padding': hasPadding,
      }"
    >
      <IonHeader collapse="condense">
        <IonToolbar>
          <IonTitle size="large">
            {{ title }}
          </IonTitle>
        </IonToolbar>
      </IonHeader>

      <LoadingSpinner v-if="busy && !hasData" />
      <slot v-else />
    </IonContent>
  </IonPage>
</template>


<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, useIonRouter,
} from '@ionic/vue'
import { computed, watch } from 'vue'
import { LoadingSpinner, SyncIcon, useDownloaderQueue } from '@/shared'
import { useSyncTask } from '@/education'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

defineProps<{
  title: string,
  hasPadding?: boolean
  hasData?: boolean
}>()

const emit = defineEmits<{
  syncCompleted: []
}>()

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const downloaderQueue = useDownloaderQueue()
const syncTask = useSyncTask()
const router = useIonRouter()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const busy = computed(() => downloaderQueue.isDownloading.value || syncTask.busy.value)


/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

watch(syncTask.completedAt, () => emit('syncCompleted'))


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onDownloadingIndicatorCkicked() {
  router.push({ name: 'downloads' })
}
</script>
