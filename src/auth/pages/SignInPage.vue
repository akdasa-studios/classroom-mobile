<template>
  <ion-page class="ion-padding page">
    <img
      class="logo"
      src="/logo.png"
    >
    <ErrorMessage
      :error-code="emailAuthentication.lastErrorCode.value"
    />

    <steps-wizard
      :steps-count="2"
      :current-step="authenticationStep"
    >
      <template #item0>
        <EnterEmailWizardStep v-model="email" />
      </template>
      <template #item1>
        <EnterCodeWizardStep v-model="code" />
      </template>
    </steps-wizard>

    <async-button
      expand="block"
      :progress="emailAuthentication.isInProgress.value"
      @click="authenticationStep == 0 ? onSignInClicked() : onValidateCodeClicked()"
    >
      <template v-if="authenticationStep == 0">
        Request Code
      </template>
      <template v-else-if="authenticationStep == 1">
        Sign In
      </template>
    </async-button>
  </ion-page>
</template>


<script lang="ts" setup>
import { IonPage, useIonRouter } from '@ionic/vue'
import { EnterCodeWizardStep, EnterEmailWizardStep, ErrorMessage, useEmailAuthentication } from '@/auth'
import { AsyncButton, StepsWizard } from '@/shared'
import { ref } from 'vue';

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const router = useIonRouter()
const emailAuthentication = useEmailAuthentication()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const email = ref()
const code = ref()
const authenticationStep = ref(0)


/* -------------------------------------------------------------------------- */
/*                                   Handles                                  */
/* -------------------------------------------------------------------------- */

async function onSignInClicked() {
  const result = await emailAuthentication.requestSignInCode(email.value)
  if (!result.error) {
    authenticationStep.value += 1
  }
}

async function onValidateCodeClicked() {
  const result = await emailAuthentication.signIn(code.value)
  if (result.error) { return }

  if (result.registrationRequired) {
    router.push({name: 'signup'});
  } else {
    router.navigate({name: 'education'}, "root", "replace");
  }
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
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

</style>