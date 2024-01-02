<template>
  <page-with-header-layout
    :title="title"
    :has-padding="hasPadding"
  >
    <template #content>
      <loading-spinner v-if="isLoading" />
      <slot v-else />
    </template>
  </page-with-header-layout>
</template>


<script setup lang="ts">
import { LoadingSpinner, PageWithHeaderLayout } from '@/shared'

defineProps<{
  title: string,
  isLoading: boolean
  hasPadding?: boolean
}>()
</script>
