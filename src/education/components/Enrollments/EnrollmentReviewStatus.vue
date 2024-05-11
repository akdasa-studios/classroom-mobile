<template>
  <ImageAndButtonLayout
    :image="image"
    :action="normalActionText"
    :danger-action="dangerActionText"
    :danger-action-alert="dangerActionAlert"
    @click="onButtonClicked"
  >
    <h1>{{ header }}</h1>
    {{ text }}
  </ImageAndButtonLayout>
</template>


<script setup lang="ts">
import { ImageAndButtonLayout } from '@/shared'

// --- Interface -------------------------------------------------------------
defineProps<{
  image: string,
  header: string,
  text: string,
  normalActionText: string,
  dangerActionText: string,
  dangerActionAlert?: string,
}>()
const emit = defineEmits<{
  click: [action: 'normal' | 'danger']
}>()

// --- Handlers --------------------------------------------------------------
function onButtonClicked(action: 'normal' | 'danger') {
  emit('click', action)
}
</script>