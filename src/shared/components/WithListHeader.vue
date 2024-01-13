<template>
  <IonList>
    <IonListHeader>
      <IonLabel>{{ title }}</IonLabel>
    </IonListHeader>
    <slot />
  </IonList>
</template>

<script setup lang="ts">
import { IonList, IonListHeader, IonLabel } from '@ionic/vue'
defineProps<{
  title: string
}>()
</script>