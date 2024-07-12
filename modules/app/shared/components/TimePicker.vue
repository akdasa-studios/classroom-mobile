<template>
  <ion-picker
    :is-open="isOpen"
    :columns="memorizationTimeColumns"
    :buttons="memorizationTimeButtons"
    @did-dismiss="onPickerDismiss"
  />
</template>

<script lang="ts" setup>
import { IonPicker } from '@ionic/vue'
import { useFluent } from 'fluent-vue'
import { computed, toRefs } from 'vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  isOpen: boolean
  startHour: number
  endHour: number
  daysIndex: number
}>()

const emit = defineEmits<{
  close: [value?: string]
}>()


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const fluent = useFluent()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const { isOpen, startHour, endHour, daysIndex } = toRefs(props)

const memorizationTimeColumns = computed(() => [
  {
    name: 'startHour',
    selectedIndex: startHour.value,
    options: [
      { text: '00:00', value: [0, 0] },
      { text: '01:00', value: [1, 0] },
      { text: '02:00', value: [2, 0] },
      { text: '03:00', value: [3, 0] },
      { text: '04:00', value: [4, 0] },
      { text: '05:00', value: [5, 0] },
      { text: '06:00', value: [6, 0] },
      { text: '07:00', value: [7, 0] },
      { text: '08:00', value: [8, 0] },
      { text: '09:00', value: [9, 0] },
      { text: '10:00', value: [10, 0] },
      { text: '11:00', value: [11, 0] },
      { text: '12:00', value: [12, 0] },
      { text: '13:00', value: [13, 0] },
      { text: '14:00', value: [14, 0] },
      { text: '15:00', value: [15, 0] },
      { text: '16:00', value: [16, 0] },
      { text: '17:00', value: [17, 0] },
      { text: '18:00', value: [18, 0] },
      { text: '19:00', value: [19, 0] },
      { text: '20:00', value: [20, 0] },
      { text: '21:00', value: [21, 0] },
      { text: '22:00', value: [22, 0] },
      { text: '23:00', value: [23, 0] },
    ],
  },
  {
    name: 'endHour',
    selectedIndex: endHour.value,
    options: [
      { text: '00:00', value: [0, 0] },
      { text: '01:00', value: [1, 0] },
      { text: '02:00', value: [2, 0] },
      { text: '03:00', value: [3, 0] },
      { text: '04:00', value: [4, 0] },
      { text: '05:00', value: [5, 0] },
      { text: '06:00', value: [6, 0] },
      { text: '07:00', value: [7, 0] },
      { text: '08:00', value: [8, 0] },
      { text: '09:00', value: [9, 0] },
      { text: '10:00', value: [10, 0] },
      { text: '11:00', value: [11, 0] },
      { text: '12:00', value: [12, 0] },
      { text: '13:00', value: [13, 0] },
      { text: '14:00', value: [14, 0] },
      { text: '15:00', value: [15, 0] },
      { text: '16:00', value: [16, 0] },
      { text: '17:00', value: [17, 0] },
      { text: '18:00', value: [18, 0] },
      { text: '19:00', value: [19, 0] },
      { text: '20:00', value: [20, 0] },
      { text: '21:00', value: [21, 0] },
      { text: '22:00', value: [22, 0] },
      { text: '23:00', value: [23, 0] },
    ],
  },
  {
    name: 'days',
    selectedIndex: daysIndex.value,
    options: [
      { text: fluent.$t('weekends'),  value: [6,7] },
      { text: fluent.$t('weekdays'),  value: [1,2,3,4,5] },
      { text: fluent.$t('any-day'),   value: [1,2,3,4,5,6,7] },
      { text: fluent.$t('monday'),    value: [1] },
      { text: fluent.$t('tuesday'),   value: [2] },
      { text: fluent.$t('wednesday'), value: [3] },
      { text: fluent.$t('thursday'),  value: [4] },
      { text: fluent.$t('friday'),    value: [5] },
      { text: fluent.$t('saturday'),  value: [6] },
      { text: fluent.$t('sunday'),    value: [7] },
    ],
  },
])

const memorizationTimeButtons = [
{
    text: fluent.$t('cancel'),
    role: 'cancel',
  },
  {
    text: fluent.$t('ok'),
    handler: (value: any) => {
      emit('close', value)
    },
  }
]


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onPickerDismiss() {
  emit('close')
}
</script>
