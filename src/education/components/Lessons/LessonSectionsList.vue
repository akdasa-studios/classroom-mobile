<template>
  <div v-bind="$attrs">
    <ion-chip
      v-for="section, idx in sections"
      :key="section.id.value"
      :color="getColor(idx)"
      @click="emit('click', idx)"
    >
      <ion-icon
        :icon="attachOutline"
        :color="getColor(idx)"
      />
      <ion-label>{{ section.title }}</ion-label>
    </ion-chip>
  </div>
</template>


<script setup lang="ts">
import { LessonSection } from '@/education'
import { IonChip, IonIcon, IonLabel } from '@ionic/vue'
import { attachOutline } from 'ionicons/icons'

const props = defineProps<{
  sections: readonly LessonSection[]
  active: number
}>()

const emit = defineEmits<{
  click: [index: number]
}>()

function getColor(idx: number) {
  return idx === props.active ? 'primary' : 'medium'
}
</script>