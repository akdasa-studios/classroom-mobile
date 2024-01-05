<template>
  <ion-item
    :detail="true"
    lines="none"
    @click="onClicked"
  >
    <ion-avatar
      slot="start"
      aria-hidden="true"
    >
      <img :src="imageUrl">
    </ion-avatar>

    <ion-label>
      <h2>
        {{ courseName }}
      </h2>
      <p class="ion-text-wrap">
        {{ groupName }}

        <ion-text
          v-if="info"
          color="medium"
        >
          {{ info }}
        </ion-text>

        <ion-text
          v-if="showStatus"
          color="primary"
        >
          {{ $t(status) }}
        </ion-text>
      </p>
    </ion-label>
  </ion-item>
</template>


<script setup lang="ts">
import { IonItem, IonLabel, IonAvatar, IonText } from '@ionic/vue'
import { computed } from 'vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  id: string
  courseName: string,
  groupName?: string,
  info?: string,
  imageUrl: string
  status: 'pending' | 'in-review' | 'approved' | 'declined'
}>()

const emit = defineEmits<{
  click: [],
}>()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const showStatus = computed(() => props.status !== 'approved' && props.info === undefined)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onClicked() {
  emit('click')
}
</script>


<fluent locale="en">
pending = Pending
in-review = In Review
approved = Approved
declined = Declined
</fluent>