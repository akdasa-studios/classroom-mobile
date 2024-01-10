<template>
  <div v-bind="$attrs">
    <ion-chip
      v-for="section, idx in items"
      :key="idx"
      :color="getColor(idx)"
      @click="emit('click', idx)"
    >
      <ion-icon
        :icon="getSectionIcon(section.state)"
        :color="getColor(idx)"
      />
      <ion-label>{{ section.title }}</ion-label>
    </ion-chip>
  </div>
</template>


<script setup lang="ts">
import { LessonSectionStateViewModel } from '@/education'
import { IonChip, IonIcon, IonLabel } from '@ionic/vue'
import { attachOutline, checkmarkOutline, syncOutline, checkmarkDoneOutline } from 'ionicons/icons'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  items: LessonSectionStateViewModel[]
  active: number
}>()

const emit = defineEmits<{
  click: [index: number]
}>()


/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

function getColor(idx: number) {
  return idx === props.active ? 'primary' : 'medium'
}

function getSectionIcon(
  state: string
) {
  if (state === 'open')      { return attachOutline }
  if (state === 'in-review') { return checkmarkOutline }
  if (state === 'returned')  { return syncOutline }
  if (state === 'accepted')  { return checkmarkDoneOutline }
  return attachOutline
}
</script>