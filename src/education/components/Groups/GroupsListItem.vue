<template>
  <ion-item
    lines="none"
  >
    <ion-avatar
      slot="start"
      aria-hidden="true"
    >
      <img :src="imageUrl">
    </ion-avatar>

    <ion-radio :value="id">
      <ion-label>
        <h2>{{ name }}</h2>
        <p class="ion-text-wrap">
          {{ leader }}
          {{ info }}
          <ion-text
            v-if="startsAt"
            color="primary"
          >
            {{ formatDate(startsAt) }}
          </ion-text>
        </p>
      </ion-label>
    </ion-radio>
  </ion-item>
</template>


<script setup lang="ts">
import { IonItem, IonLabel, IonRadio, IonAvatar, IonText } from '@ionic/vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

defineProps<{
  id: string
  name: string,
  leader?: string,
  info?: string,
  imageUrl: string
  startsAt?: number,
}>()


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
