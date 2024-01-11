<template>
  <IonItem
    :detail="true"
    lines="none"
    @click="onClicked"
  >
    <IonAvatar
      slot="start"
      aria-hidden="true"
    >
      <CachedImage :url="imageUrl" />
    </IonAvatar>

    <IonLabel>
      <h2>
        {{ courseName }}
      </h2>
      <p class="ion-text-wrap">
        {{ groupName }}

        <IonText
          v-if="info"
          color="medium"
        >
          {{ info }}
        </IonText>

        <IonText
          v-if="showStatus"
          color="primary"
        >
          {{ $t(status) }}
        </IonText>
      </p>
    </IonLabel>
  </IonItem>
</template>


<script setup lang="ts">
import { computed } from 'vue'
import { IonItem, IonLabel, IonAvatar, IonText } from '@ionic/vue'
import { CachedImage } from '@/shared'

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