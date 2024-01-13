<template>
  <IonSegment
    :value="selected"
  >
    <IonSegmentButton
      v-for="section, idx in items"
      :key="idx"
      :value="idx"
      @click="emit('click', section.id)"
    >
      <ion-label>{{ section.title }}</ion-label>
    </IonSegmentButton>
  </IonSegment>
</template>


<script setup lang="ts">
import { LessonSection, LessonSectionIdentity } from '@/education'
import { IonLabel, IonSegment, IonSegmentButton } from '@ionic/vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

defineProps<{
  items: readonly LessonSection[]
  selected: number
}>()

const emit = defineEmits<{
  click: [id: LessonSectionIdentity]
}>()


/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

// function getSectionIcon(
//   state: string
// ) {
//   if (state === 'open')      { return attachOutline }
//   if (state === 'in-review') { return checkmarkOutline }
//   if (state === 'returned')  { return syncOutline }
//   if (state === 'accepted')  { return checkmarkDoneOutline }
//   return attachOutline
// }
</script>