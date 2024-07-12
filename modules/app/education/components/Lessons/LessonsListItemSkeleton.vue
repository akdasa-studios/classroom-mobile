<template>
  <ion-item lines="none">
    <ion-label>
      <h3>
        <ion-skeleton-text
          :animated="true"
          style="width: 80%;"
        />
      </h3>
      <p>
        <ion-skeleton-text
          :animated="true"
          style="width: 60%;"
        />
      </p>
    </ion-label>
  </ion-item>
</template>

<script setup lang="ts">
import { IonItem, IonLabel, IonSkeletonText } from '@ionic/vue'
</script>