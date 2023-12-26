<template>
  <ion-item lines="none">
    <slot />
  </ion-item>
</template>


<script lang="ts" setup>
import { IonItem } from "@ionic/vue"
</script>


<style scoped>
ion-item {
  --background: var(--ion-color-light);
  --color: var(--ion-color-light-contrast);

  --border-color: var(--ion-color-light-shade);
  --border-style: solid;
  --border-width: 1px;

  --border-radius: 7px;
}
</style>