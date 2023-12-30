<template>
  <help-message>
    {{ $t("welcome") }}
    {{ $t("enter-your-email") }}
  </help-message>

  <email-input v-model="email" />

  <async-button
    :progress="getSignInCodeTask.isInProgress.value"
    expand="block"
    @click="onSignInClicked()"
  >
    {{ $t('request-signin-code') }}
  </async-button>
</template>


<script lang="ts" setup>
import { EmailInput, HelpMessage } from '@/auth'
import { AsyncButton, useTask } from '@/shared'
import { GetSignInCodeByEmailTask } from '@protocol/auth'
import { KnownErrorCode, ResponseCode } from '@protocol/core'
import { ref, watch } from 'vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const emit = defineEmits<{
  complete: []
  error: [errorCode: KnownErrorCode]
}>()


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const getSignInCodeTask = useTask(new GetSignInCodeByEmailTask())


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const email = ref()


/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

watch(getSignInCodeTask.lastError, (v) => emit('error', v))


/* -------------------------------------------------------------------------- */
/*                                   Handles                                  */
/* -------------------------------------------------------------------------- */

async function onSignInClicked() {
  const result = await getSignInCodeTask.execute({ email: email.value })
  if (result.status === ResponseCode.Ok) { emit('complete') }
}
</script>


<fluent locale="en">
welcome = Welcome to the School of Devotion!
enter-your-email = Enter your email and we will send you a code to log in.
request-signin-code = Request Code
</fluent>
