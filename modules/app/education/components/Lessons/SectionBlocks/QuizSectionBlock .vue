<template>
  <IonItem
    lines="full"
    color="light"
  >
    <h3>{{ question }}</h3>
  </IonItem>

  <IonRadioGroup
    v-model="value"
  >
    <IonItem
      v-for="answer, idx in answers"
      :key="idx"
      lines="none"
    >
      <IonRadio :value="idx">
        <IonLabel class="ion-text-wrap">
          {{ answer }}
        </IonLabel>
      </IonRadio>
    </IonItem>
  </IonRadioGroup>
</template>


<script lang="ts" setup>
import { LessonSectionQuizBlockState } from '@classroom/app/education'
import { IonItem, IonLabel, IonRadio, IonRadioGroup } from '@ionic/vue'
import { ref, toRefs, watch } from 'vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  question: string,
  answers: string[],
  rightAnswer: number
  state?: LessonSectionQuizBlockState
}>()

const emit = defineEmits<{
  change: [state: LessonSectionQuizBlockState]
}>()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const { state } = toRefs(props)
const value = ref(props.state !== undefined ? props.state.answer : -1)


/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

watch(value, onAnswerChange)
watch(state, (x) => value.value = x !== undefined ? x.answer : -1)

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onAnswerChange(value: number) {
  emit('change', { type: 'quiz', answer: value })
}
</script>
