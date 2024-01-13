<template>
  <div class="center ion-padding">
    <div class="ctnt">
      <img
        :src="image"
        class="img"
      >
      <slot />
    </div>

    <div class="buttons-group">
      <ion-button
        class="btn"
        expand="block"
        fill="clear"
        @click="onActionButtonClicked"
      >
        {{ action }}
      </ion-button>

      <ion-button
        v-if="dangerAction"
        size="small"
        color="danger"
        class="btn"
        expand="block"
        fill="clear"
        @click="onDangerButtonClicked"
      >
        {{ dangerAction }}
      </ion-button>
    </div>
  </div>

  <ion-alert
    :header="dangerAction"
    :message="dangerActionAlert"
    :is-open="isAlertOpen"
    :buttons="alertButtons"
    @did-dismiss="onAlertDismiss"
  />
</template>


<script setup lang="ts">
import { IonButton, IonAlert } from '@ionic/vue'
import { useFluent } from 'fluent-vue'
import { ref } from 'vue'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const fluent = useFluent()

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

defineProps<{
  image: string
  action: string
  dangerAction?: string
  dangerActionAlert?: string
}>()

const emit = defineEmits<{
  click: [action: 'normal' | 'danger']
}>()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const alertButtons = [
  {
    text: fluent.$t('yes'),
    role: 'confirm',
  },
  {
    text: fluent.$t('no'),
    role: 'cancel',
  },
]


const isAlertOpen = ref(false)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onActionButtonClicked() {
  emit('click', 'normal')
}

function onDangerButtonClicked() {
  isAlertOpen.value = true
}

function onAlertDismiss(ev: CustomEvent) {
  if (ev.detail.role === 'confirm') {
    emit('click', 'danger')
  }
  isAlertOpen.value = false
}
</script>


<style scoped>
.center {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100% - 50px);
  text-align: center;
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

.buttons-group {
  display: flex;
  flex-direction: column;
  gap: .5rem;
  margin: 2rem;
}
</style>
