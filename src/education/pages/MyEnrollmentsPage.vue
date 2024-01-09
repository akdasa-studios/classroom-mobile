<template>
  <PageWithHeaderLayout
    :title="$t('lessons')"
    :has-padding="true"
  >
    <template #content>
      <my-enrollments-list
        ref="enrollmentsList"
        :busy="syncTask.busy.value"
      />

      <my-student-homework-list
        ref="homeworksList"
        :busy="syncTask.busy.value"
      />
    </template>
  </PageWithHeaderLayout>
</template>


<script setup lang="ts">
import { MyEnrollmentsList, MyStudentHomeworkList, useSyncTask } from '@/education'
import { PageWithHeaderLayout } from '@/shared'
import { onIonViewDidEnter } from '@ionic/vue'
import { ref, watch } from 'vue'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const syncTask = useSyncTask()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const enrollmentsList = ref()
const homeworksList = ref()


/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

onIonViewDidEnter(onFetchData)
watch(syncTask.completedAt, onFetchData)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onFetchData() {
  enrollmentsList.value.sync()
  homeworksList.value.sync()
}
</script>


<fluent locale="en">
lessons = Lessons
</fluent>

<fluent locale="ru">
lessons = Уроки
</fluent>