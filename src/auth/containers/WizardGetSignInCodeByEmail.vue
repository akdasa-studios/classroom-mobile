<template>
  <HelpMessage>
    {{ $t("welcome") }}
    {{ $t("enter-your-email") }}
  </HelpMessage>

  <EmailInput v-model="email" />

  <AsyncButton
    :busy="busy"
    :error-code="undefined"
    :disabled="email.length === 0"
    @click="onSignInClicked()"
  >
    {{ $t('request-signin-code') }}
  </AsyncButton>
</template>


<script lang="ts" setup>
import { EmailInput, HelpMessage, useAuthService } from '@/auth'
import { AsyncButton, useConfig } from '@/shared'
import { ref } from 'vue'

// --- Interface -------------------------------------------------------------
const emit = defineEmits<{
  complete: []
}>()

// --- Dependencies ----------------------------------------------------------
const authService = useAuthService()
const config = useConfig()

// --- State -----------------------------------------------------------------
const email = ref(config.email.value)
const busy = ref(false)

// --- Handlers --------------------------------------------------------------
async function onSignInClicked() {
  // TODO: Handle errors and exceptions
  busy.value = true
  config.email.value = email.value
  await authService.signIn({ email: email.value })

  emit('complete')
  busy.value = false
}
</script>


<fluent locale="en">
welcome = Welcome to the School of Devotion!
enter-your-email = Enter your email and we will send you a code to log in.
request-signin-code = Request Code
</fluent>
