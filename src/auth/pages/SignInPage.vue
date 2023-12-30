<template>
  <ion-page class="ion-padding">
    <logo-and-controls-layout>
      <template #logo>
        <school-of-devotion-logo />
      </template>

      <template #controls>
        <error-message :error-code="lastErrorCode" />

        <steps-wizard :current-step="authenticationStep">
          <template #item0>
            <wizard-get-sign-in-code-by-email
              @complete="onWizardGetSignInCodeByEmailCompleted"
              @error="onError"
            />
          </template>
          <template #item1>
            <wizard-sign-in-with-code
              @complete="onWizardSignInWithCodeCompleted"
              @error="onError"
            />
          </template>
        </steps-wizard>
      </template>
    </logo-and-controls-layout>
  </ion-page>
</template>


<script lang="ts" setup>
import { IonPage, useIonRouter } from '@ionic/vue'
import { WizardGetSignInCodeByEmail, WizardSignInWithCode, ErrorMessage, SchoolOfDevotionLogo, LogoAndControlsLayout } from '@/auth'
import { StepsWizard } from '@/shared'
import { ref } from 'vue'
import { KnownErrorCode } from '@protocol/core'


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const router = useIonRouter()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const authenticationStep = ref(0)
const lastErrorCode = ref<KnownErrorCode>(KnownErrorCode.NoError)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onWizardGetSignInCodeByEmailCompleted() {
  authenticationStep.value += 1
}

function onWizardSignInWithCodeCompleted(
  isRegistrationRequired: boolean
) {
  if (isRegistrationRequired) {
    router.navigate({name: 'signup'}, 'root', 'replace')
  } else {
    router.navigate({name: 'education'}, 'root', 'replace')
  }
}

function onError(errorCode: KnownErrorCode) {
  lastErrorCode.value = errorCode
}
</script>
