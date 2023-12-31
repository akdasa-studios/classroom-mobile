<template>
  <ion-page class="ion-padding">
    <ion-list>
      <h1>{{ $t('sign-up') }}</h1>
      {{ $t('need-some-information') }}
      <br>
      <br>

      <ion-input
        v-model="name"
        :label="$t('name')"
        label-placement="stacked"
        fill="outline"
        :placeholder="$t('name-placeholder')"
      />
      <br>

      <ion-input
        v-model="phoneNumber"
        :label="$t('phone-number')"
        label-placement="stacked"
        fill="outline"
        placeholder="888-888-8888"
        type="tel"
      />
      <br>

      <ion-input
        v-model="location"
        :label="$t('location')"
        label-placement="stacked"
        fill="outline"
        :placeholder="$t('location-placeholder')"
      />
      <br>

      <ion-checkbox
        v-model="conditionsAccepted"
        label-placement="end"
        justify="start"
      >
        {{ $t('i-agree-to-the-terms') }}
      </ion-checkbox>
    </ion-list>

    <async-button
      expand="block"
      :disabled="!isSugnUpButtonEmabled"
      :busy="signUpTask.isInProgress.value"
      :error-code="signUpTask.lastError.value"
      @click="onSignUpButtonClicked"
    >
      {{ $t('sign-up') }}
    </async-button>
  </ion-page>
</template>


<script lang="ts" setup>
import { computed, ref } from 'vue'
import { IonPage, IonInput, IonList, IonCheckbox, useIonRouter } from '@ionic/vue'
import { AsyncButton, useTask } from '@/shared'
import { UpdateAccountInfoTask } from '@protocol/auth'
import { ResponseCode } from '@protocol/core'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const router = useIonRouter()
const signUpTask = useTask(new UpdateAccountInfoTask())


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const name = ref()
const location = ref()
const phoneNumber = ref()
const conditionsAccepted = ref(false)
const isSugnUpButtonEmabled = computed(
  () => name.value && phoneNumber.value && conditionsAccepted.value && location.value
)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onSignUpButtonClicked() {
  const result = await signUpTask.execute({
    name: name.value, phoneNumber: phoneNumber.value
  })
  if (result.status === ResponseCode.Ok) {
    router.navigate({name: 'courses'}, 'root', 'replace')
  }
}
</script>


<fluent locale="en">
sign-up = Sign Up
need-some-information = We need some information to complete registration
name = Name
name-placeholder = Krishna das
phone-number = Phone Number
i-agree-to-the-terms = I agree to the terms and conditions
location = City
location-placeholder = Vrindavan
</fluent>