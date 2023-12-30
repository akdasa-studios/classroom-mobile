<template>
  <page-with-header-layout :title="title">
    <loading-spinner
      v-if="isLoading && items.length === 0"
    />

    <template
      v-for="item in items"
      v-else
      :key="item"
    >
      <slot :item="item" />
    </template>

    <ion-refresher
      slot="fixed"
      @ion-refresh="e => onFetchRequested('refresh', e)"
    >
      <ion-refresher-content />
    </ion-refresher>

    <ion-infinite-scroll
      :disabled="!infiniteScrollEnabled"
      @ion-infinite="e => onFetchRequested('append', e)"
    >
      <ion-infinite-scroll-content />
    </ion-infinite-scroll>
  </page-with-header-layout>
</template>

<script setup lang="ts" generic="T">
import {
  IonRefresher, IonRefresherContent,
  IonInfiniteScroll, IonInfiniteScrollContent,
  InfiniteScrollCustomEvent, RefresherCustomEvent
} from '@ionic/vue'
import { LoadingSpinner, PageWithHeaderLayout } from '@/shared'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
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
