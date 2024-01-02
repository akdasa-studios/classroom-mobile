<template>
  <page-with-header-layout :title="title">
    <template #toolbar>
      <ion-toolbar>
        <ion-searchbar @ion-change="onSearchQueryChanged" />
      </ion-toolbar>
    </template>

    <template #content>
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
        :disabled="!infiniteScrollEnabled || items.length === 0"
        @ion-infinite="e => onFetchRequested('append', e)"
      >
        <ion-infinite-scroll-content />
      </ion-infinite-scroll>
    </template>
  </page-with-header-layout>
</template>

<script setup lang="ts" generic="T">
import {
  IonRefresher, IonRefresherContent,
  IonInfiniteScroll, IonInfiniteScrollContent,
  InfiniteScrollCustomEvent, RefresherCustomEvent,
  IonToolbar, IonSearchbar,
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
  ],
  search: [
    query: string
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

function onSearchQueryChanged(
  query: any
) {
  emit('search', query.detail.value)
}
</script>
