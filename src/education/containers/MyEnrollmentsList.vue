<template>
  <with-loader :busy="busy">
    <template #loader>
      <enrollments-list-item-skeleton />
    </template>

    <template #content>
      <enrollments-list
        :enrollments="enrollments"
      />
    </template>
  </with-loader>
</template>

<script lang="ts" setup>
import {
  Enrollment, EnrollmentsList, EnrollmentViewModel,
  EnrollmentsListItemSkeleton, Group, OfUser, GroupsRelatedToEnrollments
} from '@/education'
import { WithLoader, useRepository } from '@/shared'
import { groupsFixtures, EnrollmentsFixtures } from '@/shared/fixtures'
import { onMounted, ref, shallowRef } from 'vue'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const EnrollmentsRepo = useRepository<Enrollment>(
  'enrollment-request', EnrollmentsFixtures)
const groupsRepo = useRepository<Group>('group', groupsFixtures)


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const enrollments = shallowRef<EnrollmentViewModel[]>([])
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
  const requestAggregates = await EnrollmentsRepo.find(OfUser(userId))
  const groupAggregates   = await groupsRepo.find(GroupsRelatedToEnrollments(requestAggregates.entities))

  const getGroup = (groupId: string) => groupAggregates.entities.find(x => x.id.value === groupId)

  enrollments.value = requestAggregates.entities.map(x =>({
    id: x.id.value,
    status: x.status.toString(),
    groupName: getGroup(x.groupId.value)?.name,
    leaderName: getGroup(x.groupId.value)?.couratorName,
    imageUrl: getGroup(x.groupId.value)?.couratorAvatarUrl,
    startsAt: getGroup(x.groupId.value)?.startsAt,
  } as EnrollmentViewModel))
  busy.value = false
}
</script>

