<template>
  <IonItem
    :detail="true"
    lines="full"
    @click="onClicked"
  >
    <IonLabel>
      <h2>
        {{ item.title }}
      </h2>
      <p class="ion-text-wrap">
        {{ item.summary }}
      </p>
    </IonLabel>
  </IonItem>
</template>


<script setup lang="ts">
import { IonItem, IonLabel } from '@ionic/vue'
import { Lesson } from '@classroom/app/education'

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
