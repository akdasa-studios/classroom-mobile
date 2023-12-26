<template>
  <ion-item
    v-if="props.errorCode !== KnownErrors.NoError"
    color="danger"
    lines="none"
  >
    <ion-label>
      {{ props.errorCode }}
    </ion-label>
  </ion-item>
</template>


<script lang="ts" setup>
import { IonItem, IonLabel } from '@ionic/vue'
import { KnownErrors } from '@protocol/core/KnownErrors';

const props = defineProps<{
  errorCode: KnownErrors
}>();
</script>


<style scoped>
ion-item::part(native) {
  /* background: #19422d; */
  /* color: #fff; */

  /* border-color: #fff; */
  /* border-style: dashed; */
  /* border-width: 2px; */

  border-radius: 7px;
}
</style>