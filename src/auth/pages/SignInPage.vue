<template>
  <ion-page class="ion-padding page">
    <div class="logo">
      <SchoolOfDevotionLogo />
    </div>

    <StepsWizard :current-step="authenticationStep">
      <template #item0>
        <WizardGetSignInCodeByEmail
          @complete="onWizardGetSignInCodeByEmailCompleted"
        />
      </template>
      <template #item1>
        <WizardSignInWithCode
          @complete="onWizardSignInWithCodeCompleted"
          @go-back="onWizardGoBack"
        />
      </template>
    </StepsWizard>
  </ion-page>
</template>


<script lang="ts" setup>
import { IonPage, useIonRouter } from '@ionic/vue'
import { WizardGetSignInCodeByEmail, WizardSignInWithCode, SchoolOfDevotionLogo } from '@/auth'
import { StepsWizard } from '@/shared'
import { ref } from 'vue'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const router = useIonRouter()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const authenticationStep = ref(0)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onWizardGoBack() {
  authenticationStep.value -= 1
}

function onWizardGetSignInCodeByEmailCompleted() {
  authenticationStep.value += 1
}

function onWizardSignInWithCodeCompleted(
  isRegistrationRequired: boolean
) {
  if (isRegistrationRequired) {
    router.navigate({name: 'signup'}, 'root', 'replace')
  } else {
    router.navigate({name: 'courses'}, 'root', 'replace')
  }
}
</script>


<style scoped>
.logo {
  width: 75%;
  max-width: 320px;
  max-height: 320px;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 35%;
  left: 50%;
  z-index: -1;
}

.page {
  justify-content: flex-end;
}
</style>