<template>
  <ion-button
    expand="block"
    :disabled="props.progress"
  >
    <ion-spinner
      v-if="props.progress"
      class="spinner"
      name="dots"
    />
    <slot v-else />
  </ion-button>
</template>


<script lang="ts" setup>
import { IonButton, IonSpinner } from '@ionic/vue'

const props = defineProps({
  progress: Boolean
})
</script>


<style scoped>
.spinner {
  width: 20px !important;
  height: 20px !important;
}
</style>