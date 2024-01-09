
<template>
  <PageWithHeaderLayout
    :title="isApproved ? $t('group') : ''"
    :busy="busy"
  >
    <template #content>
      <enrollment-in-review
        v-if="isInReview"
        @click="onGoBackButtonClicked"
      />

      <enrollment-declined
        v-else-if="isDeclined"
        @click="onGoBackButtonClicked"
      />

      <my-lessons-in-group
        v-if="isApproved && enrollment?.groupId"
        ref="lessonsList"
        :busy="syncTask.busy.value"
        :group-id="enrollment.groupId"
      />
    </template>
  </PageWithHeaderLayout>
</template>


<script lang="ts" setup>
import { PageWithHeaderLayout } from '@/shared'
import {
  MyLessonsInGroup, Enrollment, EnrollmentIdentity, EnrollmentStatus,
  EnrollmentInReview, EnrollmentDeclined, Cache, useSyncTask
} from '@/education'
import { computed, ref, shallowRef, watch } from 'vue'
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
const isApproved  = computed(() => enrollment.value && enrollment.value.status === EnrollmentStatus.Approved)
const isInReview  = computed(() => enrollment.value && [EnrollmentStatus.InReview, EnrollmentStatus.Pending].includes(enrollment.value.status))
const isDeclined  = computed(() => enrollment.value && [EnrollmentStatus.Declined].includes(enrollment.value.status))
const busy        = computed(() => syncTask.busy.value && enrollment.value === undefined)
const lessonsList = ref()

/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

onIonViewWillEnter(fetchData)
watch(syncTask.completedAt, fetchData)
watch(lessonsList, () => { lessonsList.value.sync() })

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onGoBackButtonClicked() {
  router.back()
}


/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

async function fetchData() {
  enrollment.value = await Cache.Enrollments.get(props.enrollmentId)
  lessonsList.value?.sync()
}
</script>


<fluent locale="en">
group = Group
</fluent>

<fluent locale="ru">
group = Группа
</fluent>
