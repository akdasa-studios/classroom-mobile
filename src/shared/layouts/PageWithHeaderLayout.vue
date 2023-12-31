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
      :class="{
        'ion-padding': hasPadding,
      }"
    >
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">
            {{ title }}
          </ion-title>
        </ion-toolbar>
      </ion-header>

      <slot />
    </ion-content>
  </ion-page>
</template>


<script setup lang="ts" generic="T">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton
} from '@ionic/vue'

defineProps<{
  title: string,
  hasPadding?: boolean
}>()
</script>
