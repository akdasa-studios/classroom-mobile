<template>
  <ion-page class="stick ion-padding">
    <ion-router-outlet />
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonRouterOutlet } from '@ionic/vue';
</script>


<style scoped>
.stick {
  display: flex;
  flex-direction: column;
  justify-content: end !important;
  height: 100%;
}
</style>