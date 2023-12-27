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
.ios ion-item {
  border-radius: 15px;
  margin: 4px 2px;
}

.md ion-item {
  margin: 4px 2px;
  border-radius: 4px;
  margin-inline: 2px;
}
</style>