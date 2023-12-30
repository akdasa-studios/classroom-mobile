<template>
  <ion-refresher
    slot="fixed"
    @ion-refresh="e => onFetchRequested('refresh', e)"
  >
    <ion-refresher-content />
  </ion-refresher>

  <template
    v-for="item in props.items"
    :key="item"
  >
    <slot :item="item" />
  </template>

  <ion-infinite-scroll
    :disabled="!props.infiniteScrollEnabled"
    @ion-infinite="e => onFetchRequested('append', e)"
  >
    <ion-infinite-scroll-content />
  </ion-infinite-scroll>
</template>


<script setup lang="ts" generic="T">
import {
  IonRefresher, IonRefresherContent,
  IonInfiniteScroll, IonInfiniteScrollContent,
  InfiniteScrollCustomEvent, RefresherCustomEvent
} from '@ionic/vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

export type FetchMode = 'refresh' | 'append'

const props = defineProps<{
  items: T[]
  infiniteScrollEnabled: boolean
}>()

const emit = defineEmits<{
  fetch: [mode: FetchMode, offset: number, complete: () => void]
}>()


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onFetchRequested(
  mode: FetchMode,
  event: RefresherCustomEvent | InfiniteScrollCustomEvent
) {
  emit(
    'fetch',
    mode,
    mode == 'refresh' ? 0 : props.items.length,
    () => { event.target.complete() }
  )
}
</script>
