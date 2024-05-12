<template>
  <IonPage>
    <IonHeader>
      <IonToolbar>
        <IonTitle>{{ title }}</IonTitle>
        <IonButtons slot="start">
          <IonBackButton />
        </IonButtons>
        <IonButtons slot="secondary">
          <IonButton
            v-if="busy"
            @click="onDownloadingIndicatorCkicked"
          >
            <IonIcon
              slot="icon-only"
              color="primary"
              :icon="cloudDownloadOutline"
            />
          </IonButton>
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
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
  IonBackButton, IonIcon, IonButton, useIonRouter,
} from '@ionic/vue'
import { computed, watch } from 'vue'
import { LoadingSpinner, useDownloaderQueue, useSync } from '@/shared'
import { cloudDownloadOutline, } from 'ionicons/icons'

// --- Interface -------------------------------------------------------------
defineProps<{
  title: string,
  hasPadding?: boolean
  hasData?: boolean
}>()

const emit = defineEmits<{
  syncCompleted: []
}>()

// --- Dependencies ----------------------------------------------------------
const downloaderQueue = useDownloaderQueue()
const sync = useSync()
const router = useIonRouter()

// --- State -----------------------------------------------------------------
const busy = computed(() => downloaderQueue.isDownloading.value || sync.busy.value)

// --- Hooks -----------------------------------------------------------------
watch(sync.completedAt, () => emit('syncCompleted'))

// --- Handlers --------------------------------------------------------------
function onDownloadingIndicatorCkicked() {
  router.push({ name: 'downloads' })
}
</script>
