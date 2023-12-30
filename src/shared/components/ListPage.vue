<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ title }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">
            {{ title }}
          </ion-title>
        </ion-toolbar>
      </ion-header>

      <loading-spinner
        v-if="isLoading && items.length === 0"
      />

      <long-list
        v-else
        v-slot="sp"
        :items="items"
        :infinite-scroll-enabled="infiniteScrollEnabled"
        @fetch="onFetchRequested"
      >
        <slot :item="sp.item" />
      </long-list>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts" generic="T">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
} from '@ionic/vue'
import { LoadingSpinner, LongList } from '@/shared'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

defineProps<{
  title: string,
  items: T[]
  infiniteScrollEnabled: boolean
  isLoading: boolean
}>()

const emit = defineEmits<{
  fetch: [
    mode: 'refresh' | 'append',
    offset: number,
    complete: () => void
  ]
}>()


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onFetchRequested(
  mode: 'refresh' | 'append',
  offset: number,
  complete: () => void
) {
  emit('fetch', mode, offset, complete)
}
</script>
