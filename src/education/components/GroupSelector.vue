<template>
  <ion-radio-group
    v-model="model"
  >
    <ion-item
      v-for="group in groups"
      :key="group.name"
      lines="none"
    >
      <ion-avatar
        slot="start"
        aria-hidden="true"
      >
        <img :src="group.couratorAvatarUrl">
      </ion-avatar>

      <ion-radio :value="group.id">
        <ion-label>
          <h2>{{ group.name }}</h2>
          <p>{{ group.couratorName }}</p>
        </ion-label>
      </ion-radio>
    </ion-item>
  </ion-radio-group>
</template>


<script setup lang="ts">
import { IonItem, IonLabel, IonRadio, IonRadioGroup, IonAvatar } from '@ionic/vue'

export interface Group {
  id: string
  name: string,
  couratorName: string,
  couratorAvatarUrl: string,
}

defineProps<{
  groups: Group[]
}>()

const model = defineModel<string>()
</script>
