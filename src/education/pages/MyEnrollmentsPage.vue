<template>
  <PageWithHeaderLayout
    :title="$t('lessons')"
    :has-data="enrollments.length > 0 || homeworks.length > 0"
    @sync-completed="onFetchData"
  >
    <WithListHeader :title="$t('my-enrollments')">
      <EnrollmentsList
        :items="enrollments"
        @click="onEnrollmentClicked"
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
import {
  EnrollmentIdentity, EnrollmentViewModel, FetchHomeworkOfUser, HomeworkViewModel, StudentHomeworkList,
  EnrollmentsList, StudentHomeworkIdentity, LessonIdentity, LessonSectionIdentity
} from '@/education'
import { PageWithHeaderLayout, WithListHeader } from '@/shared'
import { onIonViewWillEnter, useIonRouter } from '@ionic/vue'
import { shallowRef } from 'vue'
import { FetchEnrollmentsOfUser } from '@/education'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const router = useIonRouter()
const userId = 'a243727d-57ab-4595-ba17-69f3a0679bf6'


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const enrollments = shallowRef<EnrollmentViewModel[]>([])
const homeworks   = shallowRef<HomeworkViewModel[]>([])


/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

onIonViewWillEnter(onFetchData)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onFetchData() {
  await fetchData(userId)
}

function onEnrollmentClicked(
  enrollmentId: EnrollmentIdentity
) {
  router.push({
    name:   'my-enrollment',
    params: { id: enrollmentId.value }
  })
}

function onStudentHomeworkClicked(
  homeworkId: StudentHomeworkIdentity,
  lessonId: LessonIdentity,
  lessonSectionId: LessonSectionIdentity,
) {
  router.push({
    name:   'lesson',
    params: { lessonId:  lessonId.value },
    query:  { sectionId: lessonSectionId.value },
  })
}

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

async function fetchData(
  userId: string
) {
  [
    enrollments.value,
    homeworks.value
  ] = await Promise.all([
    FetchEnrollmentsOfUser(userId),
    FetchHomeworkOfUser(userId)
  ])
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
