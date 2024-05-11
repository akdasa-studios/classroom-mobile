<template>
  <PageWithHeaderLayout
    :title="$t('lessons')"
    :has-data="enrollments.length > 0 || homeworks.length > 0"
    @sync-completed="refresh"
  >
    <WithListHeader :title="$t('my-enrollments')">
      <EnrollmentsList
        :items="enrollments"
        @click="onEnrollmentClicked"
        @delete="onDeleteEnrollment"
      />
    </WithListHeader>

    <WithListHeader :title="$t('homework')">
      <StudentHomeworkList
        :items="homeworks"
        @click="onStudentHomeworkClicked"
      />
    </WithListHeader>
  </PageWithHeaderLayout>
</template>


<script setup lang="ts">
import { onIonViewWillEnter, useIonRouter } from '@ionic/vue'
import { useAsyncState } from '@vueuse/core'
import { PageWithHeaderLayout, WithListHeader } from '@/shared'
import {
  FetchHomeworkOfUser, StudentHomeworkList, EnrollmentsList, Database,
  FetchEnrollmentsOfUser, useSyncTask
} from '@/education'

// --- Dependencies ----------------------------------------------------------
const router = useIonRouter()
const sync = useSyncTask()

// --- State -----------------------------------------------------------------
const { state: enrollments, execute: refreshEnrollments } =
  useAsyncState(() => FetchEnrollmentsOfUser(), [], { resetOnExecute: false })
const { state: homeworks, execute: refreshHomeworks } =
  useAsyncState(() => FetchHomeworkOfUser(), [], { resetOnExecute: false })

// --- Hooks -----------------------------------------------------------------
onIonViewWillEnter(async () => await refresh())

// --- Handlers --------------------------------------------------------------
function onEnrollmentClicked(
  enrollmentId: string
) {
  router.push({
    name:   'my-enrollment',
    params: { id: enrollmentId }
  })
}

async function onDeleteEnrollment(
  enrollmentId: string
) {
  const enrollment = await Database.Enrollments.get(enrollmentId)
  enrollment.archive()
  Database.Enrollments.save(enrollment)
  await refresh()
  await sync.start()
}

function onStudentHomeworkClicked(
  homeworkId: string,
  lessonId: string,
  lessonSectionId: string,
) {
  router.push({
    name:   'lesson',
    params: { lessonId:  lessonId },
    query:  { sectionId: lessonSectionId },
  })
}

// --- Helpers ---------------------------------------------------------------
async function refresh() {
  await refreshHomeworks()
  await refreshEnrollments()
}
</script>


<fluent locale="en">
lessons = Lessons
my-enrollments = My Groups
homework = Homework
</fluent>

<fluent locale="ru">
lessons = Уроки
my-enrollments = Мои группы
homework = Домашняя работа
</fluent>
