<template>
  <ion-item
    :detail="true"
    lines="none"
    @click="onClicked"
  >
    <ion-label>
      <h2>
        {{ model.title }}
      </h2>
      <p class="ion-text-wrap">
        {{ model.summary }}
      </p>
    </ion-label>
  </ion-item>
</template>


<script setup lang="ts">
import { IonItem, IonLabel } from '@ionic/vue'
import { Lesson } from '@/education'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const model = defineModel<Lesson>({ required: true })

const emit = defineEmits<{
  click: [],
}>()


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onClicked() {
  emit('click')
}
</script>
