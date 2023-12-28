<template>
  <ion-page class="ion-padding page">
    <img
      class="logo"
      src="/logo.png"
    >

    <error-message :error-code="lastErrorCode" />

    <steps-wizard
      :current-step="authenticationStep"
    >
      <template #item0>
        <enter-email-wizard-step
          @complete="onWizardStepCompleted"
          @error="onError"
        />
      </template>
      <template #item1>
        <enter-code-wizard-step
          @complete="onWizardStepCompleted"
          @error="onError"
        />
      </template>
    </steps-wizard>
  </ion-page>
</template>


<script lang="ts" setup>
import { IonPage } from '@ionic/vue'
import { EnterCodeWizardStep, EnterEmailWizardStep, ErrorMessage } from '@/auth'
import { StepsWizard } from '@/shared'
import { ref } from 'vue';
import { KnownErrors } from '@protocol/core/KnownErrors';

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const authenticationStep = ref(0)
const lastErrorCode = ref<KnownErrors>(KnownErrors.NoError)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onWizardStepCompleted() {
  authenticationStep.value += 1
}

function onError(errorCode: KnownErrors) {
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
