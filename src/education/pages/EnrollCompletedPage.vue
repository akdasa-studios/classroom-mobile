<template>
  <ion-page class="center">
    <CongratsConfetti />

    <div class="ctnt">
      <img src="/congrats.png">
      <h2>{{ $t('congratulations') }}</h2>
      <div>{{ $t('enrollment-request-submited') }}</div>
      {{ $t('wait-for-assignment') }}
    </div>

    <div>
      <IonButton
        class="btn"
        expand="block"
        fill="clear"
        @click="onGoToMyGroupsClicked"
      >
        {{ $t('go-to-my-enrollments') }}
      </IonButton>
    </div>
  </ion-page>
</template>


<script setup lang="ts">
import { useIonRouter } from '@ionic/vue'
import { IonPage, IonButton } from '@ionic/vue'
import { CongratsConfetti } from '@/shared'

// --- Interface -------------------------------------------------------------
defineProps<{
  id: string
}>()

// --- Dependencies ----------------------------------------------------------
const router = useIonRouter()

// --- Handlers --------------------------------------------------------------
function onGoToMyGroupsClicked() {
  router.navigate({ name: 'my-enrollments' }, 'root', 'pop')
}
</script>


<style scoped>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.ctnt {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: auto;
}

.btn {
  margin: 20px;
}

.icon {
  max-width: 60%;
  max-height: 60%;
}
</style>


<fluent locale="en">
congratulations = Congratulations!
enrollment-request-submited = The enrolment request has been submitted
wait-for-assignment = Wait for assignment
go-to-my-enrollments = Go to my groups
</fluent>