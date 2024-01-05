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

    <ion-label>
      <h2>
        {{ groupName }}
      </h2>
      <p class="ion-text-wrap">
        {{ leaderName }}
        <ion-text
          v-if="startsAt"
          color="primary"
        >
          {{ formatDate(startsAt) }}
        </ion-text>
        <ion-text color="tertiary">
          ({{ $t(status) }})
        </ion-text>
      </p>
    </ion-label>
  </ion-item>
</template>


<script setup lang="ts">
import { IonItem, IonLabel, IonAvatar, IonText } from '@ionic/vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

defineProps<{
  id: string
  groupName: string,
  leaderName: string,
  imageUrl: string
  startsAt: number,
  status: 'pending' | 'in-review' | 'approved' | 'declined'
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


<fluent locale="en">
pending = Pending
in-review = In Review
approved = Approved
declined = Declined
</fluent>