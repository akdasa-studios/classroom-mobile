
<template>
  <PageWithHeaderLayout
    :title="state.enrollment.status === 'approved' ? $t('group') : ''"
    :has-data="isReady"
    @sync-completed="onSyncCompleted"
  >
    <component
      :is="statusComponentMap[state.enrollment.status]"
      :self-declined="state.enrollment.declinedBy === userId"
      @click="onGoBackButtonClicked"
    />

    <LessonsList
      v-if="state.enrollment.status === 'approved' && state.enrollment?.groupId"
      :items="state.lessons"
      @click="onLessonClicked"
    />
  </PageWithHeaderLayout>
</template>


<script lang="ts" setup>
import { useAsyncState } from '@vueuse/core'
import { PageWithHeaderLayout } from '@/shared'
import {
  LessonsList, Enrollment, EnrollmentNotSubmitted, EnrollmentInReview,
  EnrollmentDeclined, Repositories, Lesson, FetchLessonsOfGroup,
  EmptyEnrollment, useSyncTask
} from '@/education'
import { useIonRouter } from '@ionic/vue'

// --- Dependencies ----------------------------------------------------------
const router = useIonRouter()
const sync = useSyncTask()
const userId = 'a243727d-57ab-4595-ba17-69f3a0679bf6'

// --- Interface -------------------------------------------------------------
const props = defineProps<{
  enrollmentId: string
}>()

// --- State -----------------------------------------------------------------
const statusComponentMap = {
  'not-submitted': EnrollmentNotSubmitted,
  'pending': EnrollmentInReview,
  'declined': EnrollmentDeclined,
  'approved': undefined,
  'graduated': undefined,
}

type State = { enrollment: Enrollment, lessons: readonly Lesson[] }
const { state, isReady, execute: reloadState } = useAsyncState(
  () => fetchData(props.enrollmentId),
  { enrollment: EmptyEnrollment(), lessons: [] },
  { resetOnExecute: false }
)

// --- Handlers --------------------------------------------------------------
async function onGoBackButtonClicked(action: string) {
  if (action === 'danger') {
    state.value.enrollment.status = 'declined'
    state.value.enrollment.declinedBy = userId
    state.value.enrollment.shouldSync = true
    await Repositories.Enrollments.save(state.value.enrollment)
    await sync.start()
  }
  router.back()
}

function onLessonClicked(lessonId: string) {
  router.push({name: 'lesson', params: { lessonId: lessonId } })
}

async function onSyncCompleted() {
  await reloadState()
}

// --- Helpers ---------------------------------------------------------------
async function fetchData(enrollmentId: string) {
  const state: State = { enrollment: EmptyEnrollment(), lessons: [] }
  state.enrollment = await Repositories.Enrollments.get(enrollmentId)
  if (state.enrollment.groupId) {
    state.lessons = await FetchLessonsOfGroup(state.enrollment.groupId)
  }
  return state
}
</script>


<fluent locale="en">
group = Group
</fluent>

<fluent locale="ru">
group = Группа
</fluent>
