<template>
  <ion-list>
    <ion-list-header>
      <ion-label>{{ title }}</ion-label>
    </ion-list-header>
    <slot />
  </ion-list>
</template>

<script setup lang="ts">
import { IonList, IonListHeader, IonLabel } from '@ionic/vue'
defineProps<{
  title: string
}>()
</script>