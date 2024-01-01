<template>
  <help-message>
    {{ $t('enter-code') }}
  </help-message>

  <code-input
    v-model="code"
    @back-button-click="onBackButtonClicked"
  />

  <async-button
    :busy="getSignInCodeTask.isInProgress.value"
    :error-code="getSignInCodeTask.lastError.value"
    :disabled="code.length === 0"
    expand="block"
    @click="onValidateCodeClicked()"
  >
    {{ $t('sign-in') }}
  </async-button>
</template>


<script lang="ts" setup>
import { CodeInput, HelpMessage, SignInWithCodeTask } from '@/auth'
import { AsyncButton, useTask } from '@/shared'
import { ResponseCode } from '@protocol/core'
import { ref } from 'vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const emit = defineEmits<{
  complete: [isRegistrationRequired: boolean]
  goBack: []
}>()


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const getSignInCodeTask = useTask(new SignInWithCodeTask())


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const code = ref('')


/* -------------------------------------------------------------------------- */
/*                                   Handles                                  */
/* -------------------------------------------------------------------------- */

async function onValidateCodeClicked() {
  const result = await getSignInCodeTask.execute({ code: code.value })
  if (result.status === ResponseCode.Error) { return }
  emit('complete', result.data.registrationRequired)
}

function onBackButtonClicked() {
  emit('goBack')
}
</script>


<fluent locale="en">
enter-code = Enter the code that we have sent to your email
sign-in = Sign In
</fluent>
