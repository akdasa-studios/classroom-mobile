<template>
  <ion-card
    v-bind="$attrs"
  >
    <img
      :alt="props.title"
      :src="props.coverImageUrl"
    >

    <ion-card-header>
      <ion-card-title>{{ props.title }}</ion-card-title>
      <ion-card-subtitle>{{ props.subtitle }}</ion-card-subtitle>
    </ion-card-header>

    <ion-card-content>
      {{ props.summary }}
    </ion-card-content>
  </ion-card>
</template>


<script setup lang="ts">
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue'

const props = defineProps<{
  title: string,
  subtitle: string,
  summary: string,
  coverImageUrl: string
}>()
</script>
