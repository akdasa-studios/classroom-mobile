<template>
  <ion-item lines="none">
    <ion-icon
      slot="end"
      aria-hidden="true"
      :icon="closeOutline"
      @click.stop="onRemoveClicked"
    />
    <ion-label v-if="model">
      <h2>{{ formatTime(model.start) }} - {{ formatTime(model.end) }}</h2>
      <p>{{ $t(formatDays(model.days)) }}</p>
    </ion-label>
  </ion-item>
</template>


<script lang="ts" setup>
import { IonItem, IonLabel, IonIcon } from '@ionic/vue'
import { Day, Time, TimeRange, getDaysNameAndIndex } from './TimeRange'
import { closeOutline } from 'ionicons/icons'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const model = defineModel<TimeRange>()

const emit = defineEmits<{
  remove: []
}>()

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onRemoveClicked() {
  emit('remove')
}


/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

function formatTime(
  time: Time
): string {
  return `${time[0].toString().padStart(2, '0')}:${time[1].toString().padStart(2, '0')}`
}

function formatDays(
  days: Day[]
): string {
  return getDaysNameAndIndex(days)[0]
}
</script>
