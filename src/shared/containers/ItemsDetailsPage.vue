<template>
  <page-with-header-layout
    :title="title"
    :has-padding="hasPadding"
  >
    <template #content>
      <loading-spinner v-if="isLoading" />
      <slot
        v-if="!isError && aggregate"
        name="success"
        :data="aggregate"
      />
      <slot
        v-if="isError"
        name="error"
      />
    </template>
  </page-with-header-layout>
</template>


<script setup lang="ts" generic="TAggregate extends Aggregate<AnyIdentity>">
import { Aggregate, AnyIdentity } from '@framework/domain'
import { onMounted, ref } from 'vue'
import { LoadingSpinner, PageWithHeaderLayout } from '@/shared'


/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  title: string,
  hasPadding?: boolean,
  fetcher: () => Promise<TAggregate>
}>()

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const aggregate = ref<TAggregate>()
const isError = ref(false)
const isLoading = ref(false)


/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

// TODO: change to the other hook
onMounted(onFetchRequested)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onFetchRequested() {
  isLoading.value = true
  aggregate.value = await props.fetcher()
  isLoading.value = false
}
</script>
