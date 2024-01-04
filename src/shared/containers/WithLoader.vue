<template>
  <slot
    v-if="busy"
    name="loader"
  >
    <div>
      <ion-spinner />
    </div>
  </slot>
  <slot
    v-if="!busy"
    name="content"
  />
</template>


<script setup lang="ts">
import { IonSpinner } from '@ionic/vue'

defineProps<{
  busy: boolean
}>()
</script>

<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
