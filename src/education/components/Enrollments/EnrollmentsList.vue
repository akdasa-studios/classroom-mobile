<template>
  <enrollments-list-item
    v-for="request in enrollments"
    :id="request.id"
    :key="request.id"
    :group-name="request.groupName"
    :leader-name="request.leaderName"
    :image-url="request.imageUrl"
    :starts-at="request.startsAt"
    :status="request.status"
  />
</template>


<script setup lang="ts">
import { EnrollmentsListItem } from '@/education'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

export interface EnrollmentViewModel {
  id: string,
  groupName: string,
  leaderName: string,
  imageUrl: string,
  startsAt: number,
  status: 'pending' | 'in-review' | 'approved' | 'declined'
}

defineProps<{
  enrollments: EnrollmentViewModel[]
}>()
</script>
