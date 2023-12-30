<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>First initiation</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">
            First initiation
          </ion-title>
        </ion-toolbar>
      </ion-header>

      <img
        src="https://i.pinimg.com/736x/6b/ae/e0/6baee0da8198f165022776bfa2c9a8c3.jpg"
      >
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
} from '@ionic/vue'

</script>
