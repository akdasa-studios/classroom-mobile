<template>
  <div class="center">
    <div class="ctnt">
      <img
        :src="image"
        class="img"
      >
      <slot />
    </div>

    <ion-button
      class="btn"
      expand="block"
      fill="clear"
      @click="onActionButtonClicked"
    >
      {{ action }}
    </ion-button>
  </div>
</template>


<script setup lang="ts">
import { IonButton } from '@ionic/vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

defineProps<{
  image: string
  action: string
}>()

const emit = defineEmits<{
  click: []
}>()


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onActionButtonClicked() {
  emit('click')
}
</script>


<style scoped>
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100% - 50px);
}

.ctnt {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
}

.img {
  max-width: 50%;
  max-height: 50%;
  margin: 1rem;
}
</style>