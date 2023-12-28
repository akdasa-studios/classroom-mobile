<template>
  <div>
    <help-text>
      Enter the <b>code</b> that we have sent to your email
    </help-text>

    <code-input v-model="code" />

    <async-button
      :progress="getSignInCodeTask.isInProgress.value"
      expand="block"
      @click="onValidateCodeClicked()"
    >
      {{ $t('validate-code') }}
    </async-button>
  </div>
</template>


<script lang="ts" setup>
import { CodeInput, HelpText } from '@/auth'
import { AsyncButton, useTask } from '@/shared';
import { useIonRouter } from '@ionic/vue';
import { SignInWithEmailTask } from '@protocol/auth/SignIn';
import { KnownErrors } from '@protocol/core/KnownErrors';
import { ref, watch } from 'vue';

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const emit = defineEmits<{
  complete: []
  error: [errorCode: KnownErrors]
}>()


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const router = useIonRouter()
const getSignInCodeTask = useTask(new SignInWithEmailTask())


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
  if (result.error) { return }

  if (result.registrationRequired) {
    router.navigate({name: 'signup'}, "root", "replace");
  } else {
    router.navigate({name: 'education'}, "root", "replace");
  }
}
</script>


<fluent locale="en">
validate-code = Validate code
</fluent>

