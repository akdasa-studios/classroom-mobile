<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ title }}</ion-title>
        <ion-buttons slot="start">
          <ion-back-button />
        </ion-buttons>
        <ion-buttons slot="secondary">
          <ion-button
            v-if="downloaderQueue.isDownloading.value"
            @click="onDownloadingIndicatorCkicked"
          >
            <ion-icon
              slot="icon-only"
              color="primary"
              :icon="cloudDownloadOutline"
            />
          </ion-button>
        </ion-buttons>
      </ion-toolbar>
      <slot name="toolbar" />
    </ion-header>

    <ion-content
      :fullscreen="true"
      :class="{
        'ion-padding': hasPadding,
      }"
    >
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">
            {{ title }}
          </ion-title>
        </ion-toolbar>
      </ion-header>

      <loading-spinner v-if="busy" />
      <slot v-else />
    </ion-content>
  </ion-page>
</template>


<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonIcon,
  IonButton,
useIonRouter,
} from '@ionic/vue'
import { toRefs } from 'vue'
import { LoadingSpinner, useDownloaderQueue } from '@/shared'
import { cloudDownloadOutline } from 'ionicons/icons'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  title: string,
  hasPadding?: boolean
  busy?: boolean
}>()

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const downloaderQueue = useDownloaderQueue()
const router = useIonRouter()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const { busy } = toRefs(props)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onDownloadingIndicatorCkicked() {
  router.push({ name: 'downloads' })
}
</script>
