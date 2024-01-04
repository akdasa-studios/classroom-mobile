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

      <ion-radio :value="group.id.value">
        <ion-label>
          <h2>{{ group.name }}</h2>
          <p>
            {{ group.couratorName }}
            <ion-text color="primary">
              {{ formatDate(group.startsAt) }}
            </ion-text>
          </p>
        </ion-label>
      </ion-radio>
    </ion-item>
  </ion-radio-group>
</template>


<script setup lang="ts">
import { IonItem, IonLabel, IonRadio, IonRadioGroup, IonAvatar, IonText } from '@ionic/vue'
import { Group } from '@/education'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

defineProps<{
  groups: readonly Group[]
}>()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const model = defineModel<string>()


/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

function formatDate(
  timestamp: number
) {
  return new Date(timestamp * 100000)
    .toLocaleDateString('ru', {  month:'short', day:'numeric'})
}
</script>
