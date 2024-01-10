<template>
  <PageWithHeaderLayout
    :title="$t('lessons')"
    :has-padding="true"
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
  EnrollmentsList, useSyncTask, StudentHomeworkIdentity, LessonIdentity, LessonSectionIdentity
} from '@/education'
import { PageWithHeaderLayout, WithListHeader } from '@/shared'
import { onIonViewDidEnter, useIonRouter } from '@ionic/vue'
import { shallowRef, watch } from 'vue'
import { FetchEnrollmentsOfUser } from '@/education'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const syncTask = useSyncTask()
const router = useIonRouter()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const enrollments = shallowRef<EnrollmentViewModel[]>([])
const homeworks = shallowRef<HomeworkViewModel[]>([])


/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

onIonViewDidEnter(onFetchData)
watch(syncTask.completedAt, onFetchData)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onFetchData() {
  enrollments.value = await FetchEnrollmentsOfUser('a243727d-57ab-4595-ba17-69f3a0679bf6')
  homeworks.value = await FetchHomeworkOfUser('a243727d-57ab-4595-ba17-69f3a0679bf6')
}

function onEnrollmentClicked(
  id: EnrollmentIdentity
) {
  router.push({name: 'my-enrollment', params: { id: id.value } })
}

function onStudentHomeworkClicked(
  homeworkId: StudentHomeworkIdentity,
  lessonId: LessonIdentity,
  lessonSectionId: LessonSectionIdentity,
) {
  router.push({
    name: 'lesson-section',
    params: {
      id: lessonId.value,
      sectionId: lessonSectionId.value
    }
  })
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
