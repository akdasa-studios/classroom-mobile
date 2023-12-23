<template>
  <ion-page class="stick ion-padding">
    <div class="top">
      Welcome
    </div>
    <div class="email">
      <ion-input
        v-if="authenticationStep == 0"
        v-model="email"
        type="email"
        placeholder="Email"
      />
      <ion-input
        v-if="authenticationStep == 1"
        v-model="code"
        type="number"
        placeholder="Code"
      />
      {{ emailAuthentication.lastError.value }}
    </div>
    <div class="bottom">
      <async-button
        expand="block"
        :progress="emailAuthentication.requestIsInProgress.value"
        @click="authenticationStep == 0 ? onSignInClicked() : onValidateCodeClicked()"
      >
        <template v-if="authenticationStep == 0">
          Request Code
        </template>
        <template v-else-if="authenticationStep == 1">
          Sign In
        </template>
      </async-button>
    </div>
  </ion-page>
</template>


<script lang="ts" setup>
import { IonPage, IonInput, useIonRouter } from '@ionic/vue'
import { useEmailAuthentication } from '@/auth'
import { AsyncButton } from '@/shared'
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
  if (!result.error) {
    router.navigate({name: 'education'}, "root", "replace");
  }
}
</script>


<style scoped>
.stick {
  display: flex;
  flex-direction: column;
  justify-content: end !important;
  height: 100%;
}
.email {
  border-radius: 14px;
  padding: 0px 10px;
}
.top {
  flex-grow: 1;
}
.bottom {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
}
</style>