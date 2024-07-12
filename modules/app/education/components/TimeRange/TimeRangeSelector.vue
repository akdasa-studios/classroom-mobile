<template>
  <!-- Ranges -->
  <time-range-item
    v-for="item, idx in model"
    :key="idx"
    :model-value="item"
    @click="() => onIntervalEditClicked(idx)"
    @remove="() => onIntervalRemoveClicked(idx)"
  />

  <!-- Presets -->
  <div v-if="model.length === 0 || true">
    <ion-chip
      v-for="preset in presets.filter(x => !addedPresets.includes(x.name))"
      :key="preset.name"
      color="primary"
      @click="() => onPresetClicked(preset)"
    >
      {{ preset.name }}
    </ion-chip>

    <ion-chip
      color="dark"
      @click="onAddIntervalClicked"
    >
      {{ customPresetText }}
      <ion-icon :icon="addCircle" />
    </ion-chip>
  </div>

  <time-picker
    :is-open="isTimePickerOpen"
    :start-hour="model[timeBlockIdx]?.start[0] || 0"
    :end-hour="model[timeBlockIdx]?.end[0] || 0"
    :days-index="getDaysNameAndIndex(model[timeBlockIdx]?.days)[1]"
    @close="onTimePickerClosed"
  />
</template>


<script setup lang="ts">
import { TimeRangeItem } from '@classroom/app/education'
import { TimePicker } from '@classroom/app/shared'
import { IonIcon, IonChip } from '@ionic/vue'
import { ref } from 'vue'
import { TimeRange, TimeRangePreset, getDaysNameAndIndex } from './TimeRange'
import { addCircle } from 'ionicons/icons'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const model = defineModel<TimeRange[]>({
  default: [],
  required: true
})

defineProps<{
  presets: TimeRangePreset[]
  customPresetText: string
  addRangeText: string
}>()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const isTimePickerOpen = ref(false)
const timeBlockIdx = ref(0)
const addedPresets = ref<string[]>([])


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onPresetClicked(
  preset: TimeRangePreset
) {
  addedPresets.value.push(preset.name)
  model.value.push(preset.range)
}

function onIntervalRemoveClicked(
  idx: number = 0
) {
  model.value.splice(idx, 1)
}

function onAddIntervalClicked() {
  isTimePickerOpen.value = true
  timeBlockIdx.value = -1
}

function onIntervalEditClicked(
  idx: number
) {
  isTimePickerOpen.value = true
  timeBlockIdx.value = idx
}


function onTimePickerClosed(
  value: any
) {
  isTimePickerOpen.value = false
  if (!value) { return }

  const nv = {
    start: value.startHour.value,
    end: value.endHour.value,
    days: value.days.value
  }

  if (timeBlockIdx.value === -1) {
    model.value.push(nv)
  } else {
    model.value[timeBlockIdx.value] = nv
  }
}
</script>
./TimeRange/TimeRange