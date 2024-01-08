<template>
  <ion-item
    lines="full"
    color="light"
  >
    <h3>{{ question }}</h3>
  </ion-item>

  <ion-radio-group
    v-model="value"
  >
    <ion-item
      v-for="answer, idx in answers"
      :key="idx"
      lines="none"
    >
      <ion-radio :value="idx">
        <ion-label class="ion-text-wrap">
          {{ answer }}
        </ion-label>
      </ion-radio>
    </ion-item>
  </ion-radio-group>
</template>


<script lang="ts" setup>
import { IonItem, IonLabel, IonRadio, IonRadioGroup } from '@ionic/vue'
import { ref, watch } from 'vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

defineProps<{
  question: string,
  answers: string[],
  rightAnswer: number
}>()

const emit = defineEmits<{
  stateChange: [value: number]
}>()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const value = ref(-1)


/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

watch(value, onAnswerChange)

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onAnswerChange(value: number) {
  emit('stateChange', value)
}
</script>
