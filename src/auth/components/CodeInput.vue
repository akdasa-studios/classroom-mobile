<template>
  <WithBorders>
    <IonIcon
      slot="end"
      :icon="arrowBackOutline"
      aria-hidden="true"
      @click="onBackClicked"
    />
    <IonInput
      v-bind="$attrs"
      type="number"
      :placeholder="$t('code')"
    />
  </WithBorders>
</template>


<script lang="ts" setup>
import { IonInput, IonIcon } from '@ionic/vue'
import { WithBorders } from '@/shared'
import { arrowBackOutline } from 'ionicons/icons'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const emit = defineEmits<{
  backButtonClick: []
}>()


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onBackClicked() {
  emit('backButtonClick')
}
</script>


<style scoped>
ion-icon {
  opacity: .5;
  scale: .8;
}
</style>

<fluent locale="en">
code = Code
</fluent>
