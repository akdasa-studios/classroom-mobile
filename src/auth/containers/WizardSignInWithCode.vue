<template>
  <HelpMessage>
    {{ $t('enter-code') }}
  </HelpMessage>

  <CodeInput
    v-model="code"
    @back-button-click="onBackButtonClicked"
  />

  <AsyncButton
    :busy="busy"
    :error-code="undefined"
    :disabled="code.length === 0"
    expand="block"
    @click="onValidateCodeClicked()"
  >
    {{ $t('sign-in') }}
  </AsyncButton>
</template>


<script lang="ts" setup>
import { CodeInput, HelpMessage, useAuthService } from '@/auth'
import { AsyncButton } from '@/shared'
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

const authService = useAuthService()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const code = ref('')
const busy = ref(false)


/* -------------------------------------------------------------------------- */
/*                                   Handles                                  */
/* -------------------------------------------------------------------------- */

async function onValidateCodeClicked() {
  // TODO: handler errors and exceptions
  busy.value = true
  const result = await authService.signInWithCode(code.value)
  emit('complete', result.registrationRequired)
  busy.value = false
}

function onBackButtonClicked() {
  emit('goBack')
}
</script>


<fluent locale="en">
enter-code = Enter the code that we have sent to your email
sign-in = Sign In
</fluent>
