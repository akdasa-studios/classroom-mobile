<template>
  <ion-page class="ion-padding">
    <ion-list>
      <h1>Sign Up</h1>
      We need some information to complete registration
      <br>
      <br>

      <ion-input
        v-model="name"
        label="Name"
        label-placement="stacked"
        fill="outline"
        placeholder="Krishna das"
      />
      <br>

      <ion-input
        v-model="phoneNumber"
        label="Phone number"
        label-placement="stacked"
        fill="outline"
        placeholder="123456"
      />
      <br>
      <ion-checkbox
        v-model="conditionsAccepted"
        label-placement="end"
        justify="start"
      >
        I agree to the terms and conditions
      </ion-checkbox>
    </ion-list>

    <async-button
      expand="block"
      :progress="signUpTask.isInProgress.value"
      @click="onSignUpButtonClicked"
    >
      Sign Up
    </async-button>
  </ion-page>
</template>


<script lang="ts" setup>
import { ref } from 'vue';
import { IonPage, IonInput, IonList, IonCheckbox, useIonRouter } from '@ionic/vue'
import { AsyncButton, useTask } from '@/shared'
import { UpdateAccountInfoTask } from '@protocol/auth'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const router = useIonRouter()
const signUpTask = useTask(new UpdateAccountInfoTask())


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const name = ref()
const phoneNumber = ref()
const conditionsAccepted = ref(false)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onSignUpButtonClicked() {
  const result = await signUpTask.execute({
    name: name.value, phoneNumber: phoneNumber.value
  });
  if (!result.error) {
    router.navigate({name: 'education'}, "root", "replace");
  }
}
</script>