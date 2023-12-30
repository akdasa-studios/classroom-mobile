<template>
  <help-message>
    {{ $t('enter-code') }}
  </help-message>

  <code-input v-model="code" />

  <async-button
    :progress="getSignInCodeTask.isInProgress.value"
    expand="block"
    @click="onValidateCodeClicked()"
  >
    {{ $t('sign-in') }}
  </async-button>
</template>


<script lang="ts" setup>
import { CodeInput, HelpMessage } from '@/auth'
import { AsyncButton, useTask } from '@/shared'
import { SignInWithCodeTask } from '@protocol/auth'
import { KnownErrorCode, ResponseCode } from '@protocol/core'
import { ref, watch } from 'vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const emit = defineEmits<{
  complete: [isRegistrationRequired: boolean]
  error: [errorCode: KnownErrorCode]
}>()


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const getSignInCodeTask = useTask(new SignInWithCodeTask())


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const code = ref()


/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

watch(getSignInCodeTask.lastError, (v) => emit('error', v))


/* -------------------------------------------------------------------------- */
/*                                   Handles                                  */
/* -------------------------------------------------------------------------- */

async function onValidateCodeClicked() {
  const result = await getSignInCodeTask.execute({ code: code.value })
  if (result.status === ResponseCode.Error) { return }
  emit('complete', result.data.registrationRequired)
}
</script>


<fluent locale="en">
enter-code = Enter the code that we have sent to your email
sign-in = Sign In
</fluent>
