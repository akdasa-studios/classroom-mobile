<template>
  <div v-bind="$attrs">
    <ion-chip
      v-for="section, idx in sections"
      :key="section.id.value"
      :color="getColor(idx)"
      @click="emit('click', idx)"
    >
      <ion-icon
        :icon="getSectionIcon(section.id)"
        :color="getColor(idx)"
      />
      <ion-label>{{ section.title }}</ion-label>
    </ion-chip>
  </div>
</template>


<script setup lang="ts">
import { LessonSection, LessonSectionIdentity, StudentHomework, StudentHomeworkState } from '@/education'
import { IonChip, IonIcon, IonLabel } from '@ionic/vue'
import { attachOutline, checkmarkOutline, checkmarkDone } from 'ionicons/icons'


/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  sections: readonly LessonSection[]
  homeworks: readonly StudentHomework[]
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
  lessonSectionId: LessonSectionIdentity
) {
  const homework = props.homeworks.find(x => x.lessonSectionId.equals(lessonSectionId))
  if (!homework) { return attachOutline }
  if (homework.state === StudentHomeworkState.Open)     { return attachOutline }
  if (homework.state === StudentHomeworkState.InReview) { return checkmarkOutline }
  if (homework.state === StudentHomeworkState.Accepted) { return checkmarkDone }
  return attachOutline
}
</script>