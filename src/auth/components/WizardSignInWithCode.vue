<template>
  <div>
    <help-text>
      {{ $t('enter-code') }}
    </help-text>

    <code-input v-model="code" />

    <async-button
      :progress="getSignInCodeTask.isInProgress.value"
      expand="block"
      @click="onValidateCodeClicked()"
    >
      {{ $t('sign-in') }}
    </async-button>
  </div>
</template>


<script lang="ts" setup>
import { CodeInput, HelpText } from '@/auth'
import { AsyncButton, useTask } from '@/shared'
import { useIonRouter } from '@ionic/vue'
import { SignInWithCodeTask } from '@protocol/auth'
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

const router = useIonRouter()
const getSignInCodeTask = useTask(new SignInWithCodeTask())


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const code = ref()


/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

watch(getSignInCodeTask.lastError, (v) => emit("error", v))


/* -------------------------------------------------------------------------- */
/*                                   Handles                                  */
/* -------------------------------------------------------------------------- */

async function onValidateCodeClicked() {
  const result = await getSignInCodeTask.execute({ code: code.value })
  if (result.status === ResponseCode.Error) { return }

  if (result.data.registrationRequired) {
    router.navigate({name: 'signup'}, "root", "replace");
  } else {
    router.navigate({name: 'education'}, "root", "replace");
  }
}
</script>


<fluent locale="en">
enter-code = Enter the code that we have sent to your email
sign-in = Sign In
</fluent>
