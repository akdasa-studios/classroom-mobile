<template>
  <ion-page class="ion-padding page">
    <school-of-devotion-logo />

    <error-message :error-code="lastErrorCode" />

    <steps-wizard
      :current-step="authenticationStep"
    >
      <template #item0>
        <wizard-get-sign-in-code-by-email
          @complete="onWizardStepCompleted"
          @error="onError"
        />
      </template>
      <template #item1>
        <wizard-sign-in-with-code
          @complete="onWizardStepCompleted"
          @error="onError"
        />
      </template>
    </steps-wizard>
  </ion-page>
</template>


<script lang="ts" setup>
import { IonPage } from '@ionic/vue'
import { WizardGetSignInCodeByEmail, WizardSignInWithCode, ErrorMessage, SchoolOfDevotionLogo } from '@/auth'
import { StepsWizard } from '@/shared'
import { ref } from 'vue'
import { KnownErrorCode } from '@protocol/core'

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const authenticationStep = ref(0)
const lastErrorCode = ref<KnownErrorCode>(KnownErrorCode.NoError)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onWizardStepCompleted() {
  authenticationStep.value += 1
}

function onError(errorCode: KnownErrorCode) {
  lastErrorCode.value = errorCode
}
</script>


<style scoped>
.page {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}

.logo {
  width: 75lvw;
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
