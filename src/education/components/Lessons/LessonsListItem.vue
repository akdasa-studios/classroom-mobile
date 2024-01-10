<template>
  <ion-item
    :detail="true"
    @click="onClicked"
  >
    <ion-label>
      <h2>
        {{ item.title }}
      </h2>
      <p class="ion-text-wrap">
        {{ item.summary }}
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

defineProps<{
  item: Lesson
}>()

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
