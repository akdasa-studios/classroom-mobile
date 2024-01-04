<template>
  <page-with-header-layout :title="title">
    <template #toolbar>
      <ion-toolbar>
        <ion-searchbar
          v-model="searchQuery"
          :debounce="250"
          :placeholder="$t('search')"
        />
      </ion-toolbar>
    </template>

    <template #content>
      <loading-spinner
        v-if="isLoading && items.length === 0"
      />

      <div
        v-else-if="!isLoading && items.length === 0"
        class="center"
      >
        <img
          src="/monk.png"
          class="img"
        >
        Nothing found
      </div>

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
        v-if="items.length > 0"
        :disabled="!infiniteScrollEnabled"
        @ion-infinite="e => onFetchRequested('append', e)"
      >
        <ion-infinite-scroll-content />
      </ion-infinite-scroll>
    </template>
  </page-with-header-layout>
</template>

<script setup lang="ts" generic="TAggregate">
import {
  IonRefresher, IonRefresherContent,
  IonInfiniteScroll, IonInfiniteScrollContent,
  InfiniteScrollCustomEvent, RefresherCustomEvent,
  IonToolbar, IonSearchbar,
} from '@ionic/vue'
import { LoadingSpinner, PageWithHeaderLayout } from '@/shared'
import { Ref, onMounted, ref, watch } from 'vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  title: string,
  fetcher: (search: string, offset: number, count: number) => Promise<readonly TAggregate[]>
}>()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const items = ref<TAggregate[]>([]) as Ref<TAggregate[]>
const searchQuery = ref<string>('')
const infiniteScrollEnabled = ref(true) // TODO: enable if we back online
const isLoading = ref(false)


/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

// TODO: change to the other hook
onMounted(onEntered)
watch(searchQuery, () => onSearchQueryChanged())


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onEntered() {
  if (items.value.length === 0) { fetch() }
}

async function onFetchRequested(
  mode: 'refresh' | 'append',
  event: RefresherCustomEvent | InfiniteScrollCustomEvent
) {
  await fetch(mode === 'append' ? items.value.length : 0)
  await event.target.complete()
}

async function onSearchQueryChanged() {
  items.value = []
  await fetch()
}

async function fetch(
  offset: number = 0,
  count: number = 2
) {
  isLoading.value = true

  const result = await props.fetcher(searchQuery.value, offset, count)
  items.value = offset === 0
    ? Array.from(result)
    : items.value.concat(result)

  isLoading.value = false
  infiniteScrollEnabled.value = result.length == count
}
</script>


<style scoped>
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
}

.img {
  width: 120px;
  height: 120px;
  margin: 20px
}
</style>