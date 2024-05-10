<template>
  <IonCard
    v-bind="$attrs"
  >
    <CachedImage
      :url="props.coverImageUrl"
      loading-height="200px"
    />

    <IonCardHeader>
      <IonCardTitle>{{ props.title }}</IonCardTitle>
      <IonCardSubtitle>{{ props.subtitle }}</IonCardSubtitle>
    </IonCardHeader>

    <IonCardContent>
      {{ props.summary }}
    </IonCardContent>
  </IonCard>
</template>


<script setup lang="ts">
import { CachedImage } from '@/shared'
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/vue'

// --- Interface -------------------------------------------------------------
const props = defineProps<{
  title: string,
  subtitle: string,
  summary: string,
  coverImageUrl: string
}>()
</script>
