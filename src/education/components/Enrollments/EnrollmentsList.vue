<template>
  <enrollments-list-item
    v-for="enrollment in enrollments"
    :id="enrollment.id"
    :key="enrollment.id"
    :course-name="enrollment.courseName"
    :group-name="enrollment.groupName"
    :info="enrollment.info"
    :image-url="enrollment.imageUrl"
    :status="enrollment.status"
    @click="() => onEnrollmentClicked(enrollment.id)"
  />
</template>


<script setup lang="ts">
import { EnrollmentsListItem } from '@/education'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

export interface EnrollmentViewModel {
  id: string,
  groupName?: string,
  courseName: string,
  imageUrl: string,
  info?: string,
  status: 'pending' | 'in-review' | 'approved' | 'declined'
}

defineProps<{
  enrollments: EnrollmentViewModel[]
}>()

const emit = defineEmits<{
  click: [enrollmentId: string]
}>()


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onEnrollmentClicked(
  enrollmentId: string
) {
  emit('click', enrollmentId)
}
</script>
