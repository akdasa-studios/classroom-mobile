<template>
  <item-details-with-task-page
    :title="$t('enroll')"
    :task="getEnrollmentDetailsTask"
    :request="{ courseId: props.id }"
    :has-padding="true"
  >
    <template #success="{ data }">
      <!-- Select group -->
      <header-and-note
        :header="$t('group')"
        :note="$t('select-group')"
      />
      <group-selector
        v-model="groupId"
        :groups="data.groups"
      />

      <!-- Select time -->
      <header-and-note
        :header="$t('time')"
        :note="$t('select-time')"
      />
      <time-range-selector
        v-model="timeBlock"
      />

      <!-- Comments -->
      <header-and-note
        :header="$t('comments')"
      />
      <ion-textarea
        v-model="comments"
        :placeholder="$t('comments-to-join')"
        aria-label="Comments"
      />

      <!-- Enreoll -->
      <async-button
        expand="block"
        :busy="submitEnrolmentFormTask.isInProgress.value"
        @click="onEnrollButtonClicked"
      >
        {{ $t("enroll") }}
      </async-button>
    </template>

    <template #error>
      Some shit happened
    </template>
  </item-details-with-task-page>
</template>


<script setup lang="ts">
import { IonTextarea, toastController } from '@ionic/vue'
import { useIonRouter } from '@ionic/vue'
import { ItemDetailsWithTaskPage, AsyncButton, HeaderAndNote, useTask } from '@/shared'
import { GetEnrollmentDetailsTask, SubmitEnrolmentFormTask } from '@protocol/courses'
import { ref } from 'vue'
import { GroupSelector, TimeRangeSelector } from '@/education'
import { ResponseCode } from '@protocol/core'
import { useFluent } from 'fluent-vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  id: string
}>()

type Interval = { lower: number, upper: number };

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const router = useIonRouter()
const getEnrollmentDetailsTask = new GetEnrollmentDetailsTask()
const submitEnrolmentFormTask = useTask(new SubmitEnrolmentFormTask())
const fluent = useFluent()


const groupId = ref('')
const timeBlock = ref<Interval>({ lower: 8, upper: 18 })
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
        startHours: timeBlock.value.lower,
        endHours: timeBlock.value.upper
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