<template>
  <page-with-header-layout
    :title="$t('enroll')"
    :has-padding="true"
  >
    <template #content>
      <!-- Select group -->
      <header-and-note
        :header="$t('group')"
        :note="$t('select-group')"
      />
      <group-selector
        v-model="groupId"
        :course-id="id"
      />

      <!-- Select time -->
      <header-and-note
        :header="$t('time')"
        :note="$t('select-time')"
      />
      <time-range-selector
        v-model="timeRanges"
        :presets="timeRangePresets"
        custom-preset-text="Свой вариант"
        add-range-text="Добавить"
      />

      <!-- Comments -->
      <header-and-note
        :header="$t('comments')"
        :note="$t('comments-to-join')"
      />
      <ion-textarea
        v-model="comments"
        aria-label="Comments"
      />

      <!-- Enroll -->
      <async-button
        :disabled="!networkStatus.connected.value"
        expand="block"
        :busy="submitEnrolmentFormTask.isInProgress.value"
        @click="onEnrollButtonClicked"
      >
        {{ $t("enroll") }}
      </async-button>
    </template>
  </page-with-header-layout>
</template>


<script setup lang="ts">
import { IonTextarea, toastController } from '@ionic/vue'
import { useIonRouter } from '@ionic/vue'
import { PageWithHeaderLayout, AsyncButton, HeaderAndNote, useTask, useNetworkStatus } from '@/shared'
import { SubmitEnrolmentFormTask } from '@/education'
import { ref } from 'vue'
import { GroupSelector, TimeRangeSelector } from '@/education'
import { ResponseCode } from '@protocol/core'
import { useFluent } from 'fluent-vue'
import { TimeRange, TimeRangePreset } from '../components/TimeRange'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

defineProps<{
  id: string
}>()

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const router = useIonRouter()
const networkStatus = useNetworkStatus()
const submitEnrolmentFormTask = useTask(new SubmitEnrolmentFormTask())
const fluent = useFluent()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const timeRangePresets: TimeRangePreset[] = [
  { name: 'Выходные до 11 утра',    range: { start: [6, 0],  end: [11, 0], days: [6,7] } },
  { name: 'Будние дни до 9:00',     range: { start: [6, 0],  end: [9, 0],  days: [1,2,3,4,5] } },
  { name: 'Будние дни после 18:00', range: { start: [18, 0], end: [21, 0], days: [1,2,3,4,5] } },
  { name: 'Любое время ',           range: { start: [0, 0],  end: [24, 0], days: [1,2,3,4,5,6,7] } },
]

const groupId = ref('')
const timeRanges = ref<TimeRange[]>([])
const comments = ref('')


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onEnrollButtonClicked() {
  const result = await submitEnrolmentFormTask.execute({
    groupId: groupId.value,
    comments: comments.value,
    timeBlocks: [
      {
        startHours: timeRanges.value[0].start[0],
        endHours: timeRanges.value[0].end[0]
      }
    ]
  })
  if (result.status === ResponseCode.Ok) {
    router.navigate({ name: 'courses' }, 'root', 'replace')

    const toast = await toastController.create({
      message: fluent.$t('enrollment-request-submited'),
      duration: 1500,
      position: 'top',
      translucent: true,
      animated: true,
      color: 'success'
    })

    await toast.present()
  }
}
</script>


<fluent locale="en">
enroll = Enroll
group = Group
select-group = Select group to join
comments = Comments
comments-to-join = Leave a comment if necessary
time = Time
select-time = Select time
enrollment-request-submited = The enrolment request has been submitted
</fluent>