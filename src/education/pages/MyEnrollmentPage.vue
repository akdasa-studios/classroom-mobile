
<template>
  <PageWithHeaderLayout
    :title="$t('group')"
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
        v-if="showLessonsList && enrollment?.groupId"
        :group-id="enrollment.groupId"
      />
    </template>
  </PageWithHeaderLayout>
</template>


<script lang="ts" setup>
import { PageWithHeaderLayout, useRepository } from '@/shared'
import { MyLessonsInGroup, Enrollment, EnrollmentIdentity, EnrollmentStatus, EnrollmentInReview, EnrollmentDeclined } from '@/education'
import { EnrollmentsFixtures } from '@/shared/fixtures'
import { computed, onMounted, ref, shallowRef } from 'vue'
import { useIonRouter } from '@ionic/vue'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const router = useIonRouter()
const enrollmentsRepo = useRepository<Enrollment>('enrollment', EnrollmentsFixtures)


/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  enrollmentId: EnrollmentIdentity
}>()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const enrollment = shallowRef<Enrollment>()
const showLessonsList = computed(() => enrollment.value?.groupId && enrollment.value.status === EnrollmentStatus.Approved)
const isInReview = computed(() => enrollment.value && [EnrollmentStatus.InReview, EnrollmentStatus.Pending].includes(enrollment.value?.status))
const isDeclined = computed(() => enrollment.value && [EnrollmentStatus.Declined].includes(enrollment.value?.status))
const busy = ref(false)

/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

onMounted(onEnter)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onEnter() {
  busy.value = true
  enrollment.value = await enrollmentsRepo.get(props.enrollmentId)
  busy.value = false
}

function onGoBackButtonClicked() {
  router.back()
}
</script>


<fluent locale="en">
group = Group
</fluent>

<fluent locale="ru">
group = Группа
</fluent>
