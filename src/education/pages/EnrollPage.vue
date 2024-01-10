<template>
  <PageWithHeaderLayout
    :title="$t('enroll')"
    :has-padding="true"
  >
    <!-- Select group -->
    <HeaderAndNote
      :header="$t('group')"
      :note="$t('select-group')"
    />
    <GroupSelector
      v-model="groupId"
      :groups="groups"
    />

    <!-- Select time -->
    <HeaderAndNote
      :header="$t('time')"
      :note="$t('select-time')"
    />
    <TimeRangeSelector
      v-model="timeRanges"
      :presets="timeRangePresets"
      custom-preset-text="Свой вариант"
      add-range-text="Добавить"
    />

    <!-- Comments -->
    <HeaderAndNote
      :header="$t('comments')"
      :note="$t('comments-to-join')"
    />
    <IonTextarea
      v-model="comments"
      aria-label="Comments"
    />

    <!-- Enroll -->
    <AsyncButton
      :disabled="!networkStatus.connected.value"
      expand="block"
      :busy="busy"
      @click="onEnrollButtonClicked"
    >
      {{ $t("enroll") }}
    </AsyncButton>
  </PageWithHeaderLayout>
</template>


<script setup lang="ts">
import { IonTextarea, onIonViewWillEnter } from '@ionic/vue'
import { useIonRouter } from '@ionic/vue'
import { PageWithHeaderLayout, AsyncButton, HeaderAndNote, useNetworkStatus } from '@/shared'
import { Group, useEnrollmentService, useSyncTask, FetchActiveGroupsOfCourse, CourseIdentity } from '@/education'
import { ref, shallowRef, watch } from 'vue'
import { GroupSelector, TimeRangeSelector } from '@/education'
import { TimeRange, TimeRangePreset } from '../components/TimeRange'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  courseId: CourseIdentity
}>()

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const router = useIonRouter()
const networkStatus = useNetworkStatus()
const enrollmentService = useEnrollmentService()
const syncTask = useSyncTask()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const timeRangePresets: TimeRangePreset[] = [
  { name: 'Выходные до 11 утра',    range: { start: [6, 0],  end: [11, 0], days: [6,7] } },
  { name: 'Будние дни до 9:00',     range: { start: [6, 0],  end: [9, 0],  days: [1,2,3,4,5] } },
  { name: 'Будние дни после 18:00', range: { start: [18, 0], end: [21, 0], days: [1,2,3,4,5] } },
  { name: 'Любое время ',           range: { start: [0, 0],  end: [24, 0], days: [1,2,3,4,5,6,7] } },
]

const groups = shallowRef<readonly Group[]>([])
const groupId = ref('')
const timeRanges = ref<TimeRange[]>([])
const comments = ref('')
const busy = ref(false)

/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

onIonViewWillEnter(onFetchData)
watch(syncTask.completedAt, onFetchData)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onEnrollButtonClicked() {
  busy.value = true
  // TODO: handle errors and exceptions
  await enrollmentService.submit({
    groupId: groupId.value,
    comments: comments.value,
    timeBlocks: [
      {
        startHours: timeRanges.value[0].start[0],
        endHours: timeRanges.value[0].end[0]
      }
    ]
  })
  router.navigate({ name: 'enroll-completed' }, 'none', 'pop')
  busy.value = false
}

async function onFetchData() {
  groups.value = await FetchActiveGroupsOfCourse(props.courseId)
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