<template>
  <PageWithHeaderLayout
    :title="state.group?.name || $t('group')"
    :has-data="isReady"
    @sync-completed="onSyncCompleted"
  >
    <EnrollmentReviewStatus
      v-if="!state.enrollment.isApproved"
      :image="`enrollment/${state.enrollment.status}.webp`"
      :header="$t(`enrollment-${state.enrollment.status}`)"
      :text="i18n.enrollment['summary']"
      :normalActionText="i18n.enrollment['normal-action']"
      :dangerActionText="i18n.enrollment['danger-action']"
      :dangerActionAlert="i18n.enrollment['danger-action-alert']"
      @click="onStatusButtonClicked"
    />

    <LessonsList
      v-if="state.enrollment.isApproved && state.enrollment.isAssignedToGroup"
      :items="state.lessons"
      @click="onLessonClicked"
    />
  </PageWithHeaderLayout>
</template>


<script lang="ts" setup>
import { useAsyncState } from '@vueuse/core'
import { PageWithHeaderLayout } from '@/shared'
import {
  LessonsList, Enrollment, EnrollmentReviewStatus, Database, Lesson,
  FetchLessonsOfGroup, EmptyEnrollment, useSyncTask, Group,
} from '@/education'
import { useIonRouter } from '@ionic/vue'
import { useFluent } from 'fluent-vue';
import { computed } from 'vue';

// --- Dependencies ----------------------------------------------------------
const router = useIonRouter()
const sync = useSyncTask()
const fluent = useFluent()
const userId = 'a243727d-57ab-4595-ba17-69f3a0679bf6'

// --- Interface -------------------------------------------------------------
const props = defineProps<{
  enrollmentId: string
}>()

// --- State -----------------------------------------------------------------
type State = { enrollment: Enrollment, group?: Group, lessons: readonly Lesson[] }
const { state, isReady, execute: reloadState } = useAsyncState(
  () => fetchData(props.enrollmentId),
  { enrollment: EmptyEnrollment(), lessons: [] },
  { resetOnExecute: false }
)
const i18n = computed(() => ({
  enrollment: fluent.$ta(`enrollment-${state.value.enrollment.status}`)
}))

// --- Handlers --------------------------------------------------------------
async function onStatusButtonClicked(action: 'normal' | 'danger') {
  if (action === 'danger') {
    state.value.enrollment.decline(userId)
    state.value.enrollment.archive()
    await Database.Enrollments.save(state.value.enrollment)
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
  state.enrollment = await Database.Enrollments.get(enrollmentId)
  if (state.enrollment.groupId) {
    state.group = await Database.Groups.get(state.enrollment.groupId)
    state.lessons = await FetchLessonsOfGroup(state.enrollment.groupId)
  }
  return state
}
</script>


<fluent locale="en">
group = Group

enrollment-not-submitted = Enrollment not submitted
  .summary = It will be submitted once you are online
  .normal-action = Wait
  .danger-action = Cancel enrollment
  .danger-action-alert = Your enrollment will be canceled and we won't be able to add you to the group

enrollment-pending = Enrollment pending
  .normal-action = Wait
  .danger-action = Cancel enrollment
  .danger-action-alert = Your enrollment will be canceled and we won't be able to add you to the group

enrollment-declined = Enrollment declined
  .summary = Reason not specified
  .danger-action = Delete enrollment
</fluent>

<fluent locale="ru">
group = Группа

enrollment-not-submitted = Заявка еще не отправлена
  .summary = Она будет отправлена, как только вы будете онлайн
  .normal-action = Подождать
  .danger-action = Отменить заявку
  .danger-action-alert = Ваша заявка будет отменена и мы не сможем добавить вас в группу

enrollment-pending = Заявка на рассмотрении
  .normal-action = Подождать
  .danger-action = Отменить заявку
  .danger-action-alert = Ваша заявка будет отменена и мы не сможем добавить вас в группу

enrollment-declined = Заявка отклонена
  .summary = Причина не указана
  .danger-action = Удалить заявку
</fluent>
