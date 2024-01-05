<template>
  <ion-page class="center">
    <congrats-confetti />

    <div class="ctnt">
      <img src="/congrats.png">
      <h2>{{ $t('congratulations') }}</h2>
      <div>{{ $t('enrollment-request-submited') }}</div>
      {{ $t('wait-for-assignment') }}
    </div>

    <div>
      <ion-button
        class="btn"
        expand="block"
        fill="clear"
        @click="onGoToMyGroupsClicked"
      >
        Go to my groups
      </ion-button>
    </div>
  </ion-page>
</template>


<script setup lang="ts">
import { useIonRouter } from '@ionic/vue'
import { IonPage, IonButton } from '@ionic/vue'
import { CongratsConfetti } from '@/shared'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

defineProps<{
  id: string
}>()

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const router = useIonRouter()


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onGoToMyGroupsClicked() {
  router.navigate({ name: 'my-groups' }, 'root', 'pop') //, 'root', 'replace')
}
</script>


<style>
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}

.ctnt {
  margin: auto;
}

.btn {
  margin: 20px;
}
</style>


<fluent locale="en">
congratulations = Congratulations!
enrollment-request-submited = The enrolment request has been submitted
wait-for-assignment = Wait for assignment
</fluent>