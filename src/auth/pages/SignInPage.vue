<template>
  <ion-page class="ion-padding">
    <logo-and-controls-layout>
      <template #logo>
        <school-of-devotion-logo />
      </template>

      <template #controls>
        <steps-wizard :current-step="authenticationStep">
          <template #item0>
            <wizard-get-sign-in-code-by-email
              @complete="onWizardGetSignInCodeByEmailCompleted"
            />
          </template>
          <template #item1>
            <wizard-sign-in-with-code
              @complete="onWizardSignInWithCodeCompleted"
              @go-back="onWizardGoBack"
            />
          </template>
        </steps-wizard>
      </template>
    </logo-and-controls-layout>
  </ion-page>
</template>


<script lang="ts" setup>
import { IonPage, useIonRouter } from '@ionic/vue'
import { WizardGetSignInCodeByEmail, WizardSignInWithCode, SchoolOfDevotionLogo, LogoAndControlsLayout } from '@/auth'
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
