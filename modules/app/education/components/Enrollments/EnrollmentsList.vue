<template>
  <EnrollmentsListItem
    v-for="i in items"
    :id="i.enrollment.id"
    :key="i.enrollment.id"
    :course-name="i.course.title"
    :group-name="i.group?.name"
    :image-url="getAvatarUrl(i.group?.couratorAvatarUrl, i.group?.id)"
    :status="i.enrollment.status"
    @click="() => onEnrollmentClicked(i.enrollment.id)"
    @delete="() => onDelete(i.enrollment.id)"
  />
</template>


<script setup lang="ts">
import { EnrollmentsListItem } from '@classroom/app/education'
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
const NO_LEADER_AVATAR = 'user/no-avatar.jpg'

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

// --- Helpers ---------------------------------------------------------------
function getAvatarUrl(
  leaderAvatarUrl?: string,
  groupId?: string,
) {
  return !groupId ? NO_CLASS_AVATAR : leaderAvatarUrl || NO_LEADER_AVATAR
}
</script>
