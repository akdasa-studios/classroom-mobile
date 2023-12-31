<template>
  <ion-range
    v-model="internalValue"
    :dual-knobs="true"
    :min="0"
    :max="24"
    :snaps="true"
    :pin="true"
  />
</template>


<script setup lang="ts">
import { IonRange } from '@ionic/vue'
import { ref, watch } from 'vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

type Interval = { lower: number, upper: number };
type RangeValue = number | Interval;


const model = defineModel<Interval>({
  default: { lower: 0, upper: 24 },
  required: true
})

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const internalValue = ref<RangeValue>({ lower: 8, upper: 18 })


/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

watch(internalValue, () => model.value = internalValue.value as Interval)
</script>
