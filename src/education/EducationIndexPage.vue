<template>
  <ion-page>
    <ion-tabs>
      <ion-router-outlet />

      <ion-tab-bar slot="bottom">
        <ion-tab-button
          tab="explore"
          href="/education/explore"
        >
          <ion-icon
            aria-hidden="true"
            :icon="searchOutline"
          />
          <ion-label>Explore</ion-label>
        </ion-tab-button>

        <ion-tab-button
          tab="my-courses"
          href="/education/my-courses"
        >
          <ion-icon
            aria-hidden="true"
            :icon="bookOutline"
          />
          <ion-label>My courses</ion-label>
        </ion-tab-button>
      </ion-tab-bar>
    </ion-tabs>
  </ion-page>
</template>

<script setup lang="ts">
import { IonTabBar, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage, IonRouterOutlet } from '@ionic/vue';
import { bookOutline, searchOutline } from 'ionicons/icons';
</script>
