<template>
  <IonItem
    lines="none"
  >
    <IonAvatar
      slot="start"
      aria-hidden="true"
    >
      <CachedImage :url="imageUrl" />
    </IonAvatar>

    <IonRadio :value="id">
      <IonLabel>
        <h2>{{ name }}</h2>
        <p class="ion-text-wrap">
          {{ leader }}
          {{ info }}
          <IonText
            v-if="startsAt"
            color="primary"
          >
            {{ formatDate(startsAt) }}
          </IonText>
        </p>
      </IonLabel>
    </IonRadio>
  </IonItem>
</template>


<script setup lang="ts">
import { IonItem, IonLabel, IonRadio, IonAvatar, IonText } from '@ionic/vue'
import { CachedImage } from '@/shared'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

defineProps<{
  id: string | undefined,
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
  return new Date(timestamp)
    .toLocaleDateString('ru', {
      month:'long', day:'numeric', hour:'numeric', minute:'numeric'
    })
}
</script>
