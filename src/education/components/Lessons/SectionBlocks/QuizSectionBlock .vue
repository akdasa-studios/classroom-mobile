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
        <ion-label>
          {{ idx }} - {{ answer }}
        </ion-label>
      </ion-radio>
    </ion-item>
  </ion-radio-group>
</template>


<script lang="ts" setup>
import { IonItem, IonLabel, IonRadio, IonRadioGroup } from '@ionic/vue'
import { ref } from 'vue'

defineProps<{
  question: string,
  answers: string[],
  rightAnswer: number
}>()

const value = ref(-1)
</script>
