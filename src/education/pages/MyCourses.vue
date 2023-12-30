<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>My courses</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">
            My courses
          </ion-title>
        </ion-toolbar>
      </ion-header>

      Here is a list of my courses
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue'
</script>
