<template>
  <ion-button
    :disabled="disabled || busy"
    :color="isInErrorState ? 'danger' : 'primary'"
    expand="block"
    @click="onButtonClicked"
  >
    <ion-spinner
      v-if="busy"
      class="spinner"
      name="dots"
    />

    <template v-if="isInErrorState">
      <ion-icon
        slot="start"
        :icon="alertCircleOutline"
      />
      {{ errorCode ? $t(errorCode) : 'Error' }}
    </template>

    <slot v-if="!(busy || isInErrorState)" />
  </ion-button>
</template>


<script lang="ts" setup>
import { IonButton, IonSpinner, IonIcon } from '@ionic/vue'
import { ref, toRefs, watch } from 'vue'
import { alertCircleOutline } from 'ionicons/icons'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  busy: boolean,
  disabled?: boolean,
  errorCode?: string
}>()

const emit = defineEmits<{
  click: []
}>()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const isInErrorState = ref(false)
const { errorCode } = toRefs(props)
let timer: NodeJS.Timeout | undefined = undefined


/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

watch(errorCode, onErrorStateChanged)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onErrorStateChanged(
  errorCode: string | undefined
) {
  const errorOccured = !isInErrorState.value && errorCode !== undefined
  if (errorOccured) {
    isInErrorState.value = true
    if (timer) { clearTimeout(timer) }
    timer = setTimeout(() => isInErrorState.value = false, 2500)
  } else {
    if (timer) { clearTimeout(timer) }
  }
}

function onButtonClicked() {
  if (isInErrorState.value) {
    isInErrorState.value = false
    return
  }
  emit('click')
}
</script>


<style scoped>
.spinner {
  width: 20px !important;
  height: 20px !important;
}
</style>