<template>
  <ion-item
    lines="none"
    class="rounded"
  >
    <slot />
  </ion-item>
</template>


<script lang="ts" setup>
import { IonItem } from "@ionic/vue"
</script>


<style scoped>
ion-item {
  --color: var(--ion-color-light-contrast);
  --border-color: var(--ion-color-light-shade);
  --border-style: solid;
  --border-width: 1px;
}

.ios ion-item {
  --border-radius: 15px;
}

.md ion-item {
  --border-radius: 4px;
  margin-inline: 2px;
}
</style>