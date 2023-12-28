<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Explore</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">
            Explore
          </ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-card
        v-for="card in courses"
        :key="card.title"
        @click="onCourseCardClicked"
      >
        <img
          :alt="card.title"
          src="https://i.pinimg.com/736x/6b/ae/e0/6baee0da8198f165022776bfa2c9a8c3.jpg"
        >
        <ion-card-header>
          <ion-card-title>{{ card.title }}</ion-card-title>
          <ion-card-subtitle>{{ card.title }}</ion-card-subtitle>
        </ion-card-header>

        <ion-card-content>
          {{ card.description }}
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent,
  IonCardHeader, IonCardSubtitle, IonCardTitle, useIonRouter
} from '@ionic/vue';

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const router = useIonRouter();

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const courses = [
  {
    title: 'Pranama',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc aliquam tincidunt est non blandit. Donec vel dui dignissim, hendrerit lorem in, laoreet enim. Vivamus interdum consectetur convallis.',
  },
  {
    title: 'Initiation',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc aliquam tincidunt est non blandit. Donec vel dui dignissim, hendrerit lorem in, laoreet enim. Vivamus interdum consectetur convallis.',
  },
  {
    title: 'Second initiation',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc aliquam tincidunt est non blandit. Donec vel dui dignissim, hendrerit lorem in, laoreet enim. Vivamus interdum consectetur convallis.',
  }
]


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onCourseCardClicked() {
  router.push({ name: "course", params: { "id": "123456" } })
}
</script>
