<template>
  <with-borders>
    <ion-icon
      slot="end"
      :icon="arrowBackOutline"
      aria-hidden="true"
      @click="onBackClicked"
    />
    <ion-input
      v-bind="$attrs"
      type="number"
      :placeholder="$t('code')"
    />
  </with-borders>
</template>


<script lang="ts" setup>
import { IonInput  } from '@ionic/vue'
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
