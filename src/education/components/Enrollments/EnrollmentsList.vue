<template>
  <EnrollmentsListItem
    v-for="i in items"
    :id="i.enrollment.id.value"
    :key="i.enrollment.id.value"
    :course-name="i.course.title"
    :group-name="i.group?.name"
    :image-url="i.group?.couratorAvatarUrl || NO_CLASS_AVATAR"
    :status="i.enrollment.status"
    @click="() => onEnrollmentClicked(i.enrollment.id)"
  />
</template>


<script setup lang="ts">
import { EnrollmentIdentity, EnrollmentsListItem } from '@/education'
import { EnrollmentViewModel } from './EnrollmentViewModel'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

defineProps<{
  items: EnrollmentViewModel[]
}>()

const emit = defineEmits<{
  click: [enrollmentId: EnrollmentIdentity]
}>()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const NO_CLASS_AVATAR = '/class-is-recruiting-avatar.png'


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onEnrollmentClicked(
  enrollmentId: EnrollmentIdentity
) {
  emit('click', enrollmentId)
}
</script>
