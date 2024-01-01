<template>
  <help-message>
    {{ $t("welcome") }}
    {{ $t("enter-your-email") }}
  </help-message>

  <email-input v-model="email" />

  <async-button
    :busy="getSignInCodeTask.isInProgress.value"
    :error-code="getSignInCodeTask.lastError.value"
    :disabled="email.length === 0"
    @click="onSignInClicked()"
  >
    {{ $t('request-signin-code') }}
  </async-button>
</template>


<script lang="ts" setup>
import { EmailInput, GetSignInCodeByEmailTask, HelpMessage } from '@/auth'
import { AsyncButton, useTask } from '@/shared'
import { ResponseCode } from '@protocol/core'
import { ref } from 'vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const emit = defineEmits<{
  complete: []
}>()


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const getSignInCodeTask = useTask(new GetSignInCodeByEmailTask())


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const email = ref('')


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
