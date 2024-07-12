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
import { CodeInput, HelpMessage, useAuthService, useProfileService } from '@classroom/app/auth'
import { AsyncButton, useConfig } from '@classroom/app/shared'
import { ref } from 'vue'

// --- Interface -------------------------------------------------------------
const emit = defineEmits<{
  complete: [isRegistrationRequired: boolean]
  goBack: []
}>()

// --- Dependencies ----------------------------------------------------------
const authService = useAuthService()
const profileService = useProfileService()
const config = useConfig()

// --- State -----------------------------------------------------------------
const code = ref('')
const busy = ref(false)

// --- Handlers --------------------------------------------------------------
async function onValidateCodeClicked() {
  // TODO: handler errors and exceptions
  busy.value = true

  // Authenticate
  const email = config.email.value
  const authResult = await authService.signIn({ email: email, code: code.value })
  config.accessToken.value = authResult.accessToken
  config.refreshToken.value = authResult.refreshToken
  profileService.setToken(authResult.accessToken)

  // Check if profile exists
  try {
    await profileService.get()
    emit('complete', false) // No registration required
  } catch (error) {
    emit('complete', true) // Registration required
  }
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
