<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ $t('my-groups') }}</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content
      :fullscreen="true"
      class="ion-padding"
    >
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">
            {{ $t('my-groups') }}
          </ion-title>
        </ion-toolbar>
      </ion-header>

      <my-enrollment-requests-list />
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue'
import { MyEnrollmentRequestsList } from '@/education'

</script>
