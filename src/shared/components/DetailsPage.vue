<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ title }}</ion-title>
        <ion-buttons slot="start">
          <ion-back-button />
        </ion-buttons>
      </ion-toolbar>
    </ion-header>

    <ion-content
      :fullscreen="true"
      class="ion-padding"
    >
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">
            {{ title }}
          </ion-title>
        </ion-toolbar>
      </ion-header>

      <loading-spinner v-if="isLoading" />
      <slot v-else />
    </ion-content>
  </ion-page>
</template>


<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
  IonBackButton, IonButtons
} from '@ionic/vue'
import { LoadingSpinner } from '@/shared'

defineProps<{
  title: string,
  isLoading: boolean
}>()
</script>
