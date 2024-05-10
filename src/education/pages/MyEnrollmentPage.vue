
<template>
  <PageWithHeaderLayout
    :title="isApproved ? $t('group') : ''"
    :has-data="enrollment !== undefined"
  >
    <EnrollmentNotSubmitted
      v-if="isNotSubbmited"
      @click="onGoBackButtonClicked"
    />

    <EnrollmentInReview
      v-else-if="isInReview"
      @click="onGoBackButtonClicked"
    />

    <EnrollmentDeclined
      v-else-if="isDeclined"
      @click="onGoBackButtonClicked"
    />

    <LessonsList
      v-if="isApproved && enrollment?.groupId"
      :items="lessons"
      @click="onLessonClicked"
    />
  </PageWithHeaderLayout>
</template>


<script lang="ts" setup>
import { PageWithHeaderLayout } from '@/shared'
import {
  LessonsList, Enrollment, EnrollmentNotSubmitted,
  EnrollmentInReview, EnrollmentDeclined, Repositories, useSyncTask, Lesson, FetchLessonsOfGroup
} from '@/education'
import { computed, shallowRef, watch } from 'vue'
import { onIonViewWillEnter, useIonRouter } from '@ionic/vue'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const router = useIonRouter()
const syncTask = useSyncTask()


/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  enrollmentId: string
}>()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const enrollment  = shallowRef<Enrollment>()
const lessons     = shallowRef<readonly Lesson[]>([])
const status         = computed(() => enrollment.value?.status)
const isNotSubbmited = computed(() => status.value === 'not-submitted')
const isApproved     = computed(() => status.value === 'approved')
const isDeclined     = computed(() => status.value === 'declined')
const isInReview     = computed(() => status.value === 'pending')

/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

onIonViewWillEnter(fetchData)
watch(syncTask.completedAt, fetchData)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onGoBackButtonClicked() {
  router.back()
}

function onLessonClicked(lessonId: string) {
  router.push({name: 'lesson', params: { lessonId: lessonId } })
}


/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

async function fetchData() {
  enrollment.value = await Repositories.Enrollments.get(props.enrollmentId)
  if (enrollment.value.groupId) {
    lessons.value = await FetchLessonsOfGroup(enrollment.value.groupId)
  }
}
</script>


<fluent locale="en">
group = Group
</fluent>

<fluent locale="ru">
group = Группа
</fluent>
