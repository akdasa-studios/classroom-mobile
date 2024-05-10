<template>
  <EnrollmentsListItem
    v-for="i in items"
    :id="i.enrollment._id"
    :key="i.enrollment._id"
    :course-name="i.course.title"
    :group-name="i.group?.name"
    :image-url="i.group?.couratorAvatarUrl || NO_CLASS_AVATAR"
    :status="i.enrollment.status"
    @click="() => onEnrollmentClicked(i.enrollment._id)"
    @delete="() => onDelete(i.enrollment._id)"
  />
</template>


<script setup lang="ts">
import { EnrollmentsListItem } from '@/education'
import { EnrollmentViewModel } from './EnrollmentViewModel'

// --- Interface --------------------------------------------------------------
defineProps<{
  items: EnrollmentViewModel[]
}>()

const emit = defineEmits<{
  click: [enrollmentId: string]
  delete: [enrollmentId: string]
}>()

// --- State -----------------------------------------------------------------
const NO_CLASS_AVATAR = 'class-is-recruiting-avatar.png'

// --- Handlers --------------------------------------------------------------
function onEnrollmentClicked(
  enrollmentId: string
) {
  emit('click', enrollmentId)
}

function onDelete(
  enrollmentId: string
) {
  emit('delete', enrollmentId)
}
</script>
