<template>
  <with-loader :busy="busy">
    <template #loader>
      <enrollment-requests-list-item-skeleton />
    </template>

    <template #content>
      <enrollment-requests-list
        :enrollment-requests="enrollmentRequests"
      />
    </template>
  </with-loader>
</template>

<script lang="ts" setup>
import {
  EnrollmentRequest, EnrollmentRequestsList, EnrollmentRequestViewModel,
  EnrollmentRequestsListItemSkeleton, Group, OfUser, GroupsRelatedToEnrollmentRequests
} from '@/education'
import { WithLoader, useRepository } from '@/shared'
import { groupsFixtures, enrollmentRequestsFixtures } from '@/shared/fixtures'
import { onMounted, ref, shallowRef } from 'vue'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const enrollmentRequestsRepo = useRepository<EnrollmentRequest>(
  'enrollment-request', enrollmentRequestsFixtures)
const groupsRepo = useRepository<Group>('group', groupsFixtures)


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const enrollmentRequests = shallowRef<EnrollmentRequestViewModel[]>([])
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

  const userId            = 'a243727d-57ab-4595-ba17-69f3a0679bf6'
  const requestAggregates = await enrollmentRequestsRepo.find(OfUser(userId))
  const groupAggregates   = await groupsRepo.find(GroupsRelatedToEnrollmentRequests(requestAggregates.entities))

  const getGroup = (groupId: string) => groupAggregates.entities.find(x => x.id.value === groupId)

  enrollmentRequests.value = requestAggregates.entities.map(x =>({
    id: x.id.value,
    status: x.status.toString(),
    groupName: getGroup(x.groupId.value)?.name,
    leaderName: getGroup(x.groupId.value)?.couratorName,
    imageUrl: getGroup(x.groupId.value)?.couratorAvatarUrl,
    startsAt: getGroup(x.groupId.value)?.startsAt,
  } as EnrollmentRequestViewModel))
  busy.value = false
}

</script>

