<template>
  <div
    class="spinner"
  >
    <ion-spinner name="dots" />
  </div>
</template>


<script setup lang="ts">
import { IonSpinner } from '@ionic/vue'
</script>


<style scoped>
.spinner {
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
}

ion-spinner {
  width: 75px;
  height: 75px;
}
</style>