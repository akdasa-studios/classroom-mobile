
<template>
  <PageWithHeaderLayout
    :title="isApproved ? $t('group') : ''"
    :busy="busy"
  >
    <EnrollmentInReview
      v-if="isInReview"
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
  LessonsList, Enrollment, EnrollmentIdentity, EnrollmentStatus,
  EnrollmentInReview, EnrollmentDeclined, Cache, useSyncTask, OfCourse, Lesson
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
  enrollmentId: EnrollmentIdentity
}>()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const enrollment  = shallowRef<Enrollment>()
const lessons     = shallowRef<Lesson[]>([])
const isApproved  = computed(() => enrollment.value && enrollment.value.status === EnrollmentStatus.Approved)
const isInReview  = computed(() => enrollment.value && [EnrollmentStatus.InReview, EnrollmentStatus.Pending].includes(enrollment.value.status))
const isDeclined  = computed(() => enrollment.value && [EnrollmentStatus.Declined].includes(enrollment.value.status))
const busy        = computed(() => syncTask.busy.value && enrollment.value === undefined)

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
  router.push({name: 'lesson', params: { id: lessonId } })
}


/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

async function fetchData() {
  enrollment.value = await Cache.Enrollments.get(props.enrollmentId)

  const group    = await Cache.Groups.get(enrollment.value.groupId!)
  const _lessons = await Cache.Lessons.find(OfCourse(group.courseId.value))
  lessons.value = Array.from(_lessons.entities)
}
</script>


<fluent locale="en">
group = Group
</fluent>

<fluent locale="ru">
group = Группа
</fluent>
