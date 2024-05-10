<template>
  <IonItem
    lines="none"
  >
    <IonLabel
      class="ion-text-nowrap"
      @click="onClicked"
    >
      <h2> {{ homework.text }}</h2>
      <!-- <p> {{ lesson.title }} </p> -->

      <p v-if="showProgress">
        {{ getProgress() }}
      </p>
      <p v-else>
        {{ $t(homework.status) }}
      </p>
    </IonLabel>

    <IonCheckbox
      slot="start"
      aria-label="{{ homework.text }}"
      @click.stop="dummy"
    />
  </IonItem>
</template>


<script setup lang="ts">
import { IonItem, IonLabel, IonCheckbox } from '@ionic/vue'
import {
  Lesson, LessonSection, LessonSectionQuizBlockState,
  LessonSectionVideoBlockState, StudentHomework, useTimeFormatter
} from '@/education'
import { computed } from 'vue'

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
    studentHomeworkId: string,
    lessonId: string,
    lessonSectionId: string
  ],
}>()


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const timeFormatter = useTimeFormatter()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const showProgress = computed(() => props.homework.status === 'open')


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onClicked() {
  emit('click', props.homework._id, props.lesson._id, props.lessonSection._id)
}

function dummy() {
  console.log('dummy')
}


/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

function getProgress() {
  if (!props.homework.work) { return }
  const questionsTotal = props.lessonSection.blocks.filter(x => x.type === 'quiz').length
  let questionsAnswered = 0

  for (const b of props.homework.work) {
    if (b.type === 'video') {
      return `Осталось посмотреть ${timeFormatter.formatHoursAndMinutes((b as LessonSectionVideoBlockState).duration - (b as LessonSectionVideoBlockState).watched)}`
    }
    if (b.type === 'quiz') {
      questionsAnswered += (b as LessonSectionQuizBlockState).answer !== undefined ? 1 : 0
    }
  }

  if (questionsTotal) {
    return `Отвечено ${questionsAnswered} из ${questionsTotal}`
  }
}
</script>


<fluent locale="en">
open = Open
pending = Pending
in-review = In Review
returned = Returned
accepted = Accepted
</fluent>

<fluent locale="ru">
open = Открыто
pending = Ожидает отправки
in-review = На рассмотрении
returned = Возвращено
accepted = Принято
</fluent>
