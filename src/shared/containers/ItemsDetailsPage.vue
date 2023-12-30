<template>
  <page-with-header-layout :title="title">
    <loading-spinner v-if="isLoading" />
    <slot v-else />
  </page-with-header-layout>
</template>


<script setup lang="ts">
import { LoadingSpinner, PageWithHeaderLayout } from '@/shared'

defineProps<{
  title: string,
  isLoading: boolean
}>()
</script>
