<template>
  <ion-item
    :detail="true"
  >
    <ion-label
      @click="onClicked"
    >
      <h2>
        {{ homework.text }}
      </h2>
      <p class="ion-text-wrap">
        {{ lesson.title }}
      </p>
    </ion-label>

    <ion-checkbox
      slot="start"
      aria-label="{{ homework.text }}"
      @click.stop="dummy"
    />
  </ion-item>
</template>


<script setup lang="ts">
import { IonItem, IonLabel, IonCheckbox } from '@ionic/vue'
import { Lesson, LessonIdentity, LessonSection, LessonSectionIdentity, StudentHomework, StudentHomeworkIdentity } from '@/education'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  homework: StudentHomework,
  lesson: Lesson,
  lessonSection: LessonSection
}>()

const emit = defineEmits<{
  click: [
    studentHomeworkId: StudentHomeworkIdentity,
    lessonId: LessonIdentity,
    lessonSectionId: LessonSectionIdentity
  ],
}>()


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onClicked() {
  emit('click', props.homework.id, props.lesson.id, props.lessonSection.id)
}

function dummy() {
  console.log('dummy')
}
</script>
