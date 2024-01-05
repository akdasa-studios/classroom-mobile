<template>
  <with-loader :busy="busy">
    <template #loader>
      <enrollments-list-item-skeleton />
      <enrollments-list-item-skeleton />
    </template>

    <template #content>
      <enrollments-list
        :enrollments="enrollments"
        @click="onEnrollmentClicked"
      />
    </template>
  </with-loader>
</template>

<script lang="ts" setup>
import {
  Enrollment, EnrollmentsList, EnrollmentViewModel,
  EnrollmentsListItemSkeleton, Group, OfUser, GroupsRelatedToEnrollments, Course, CoursesRelatedToEnrollments
} from '@/education'
import { WithLoader, useRepository } from '@/shared'
import { groupsFixtures, EnrollmentsFixtures, courses } from '@/shared/fixtures'
import { useIonRouter } from '@ionic/vue'
import { onMounted, ref, shallowRef } from 'vue'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const router = useIonRouter()
const enrollmentsRepo = useRepository<Enrollment>(
  'enrollment-request', EnrollmentsFixtures)
const groupsRepo = useRepository<Group>('group', groupsFixtures)
const coursesRepo = useRepository<Course>('course', courses)


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

function onEnrollmentClicked(
  id: string
) {
  router.push({name: 'my-group', params: { id } })
}

async function onEnter() {
  busy.value = true

  // console.log('==>', await coursesRepo.all())
  // console.log('-->', await coursesRepo.get(new UuidIdentity('19c4dd82-c6ac-4772-8c9d-6bdebf5a538f')))

  const userId            = 'a243727d-57ab-4595-ba17-69f3a0679bf6'
  const enrollmentsAggregates = await enrollmentsRepo.find(OfUser(userId))
  const groupAggregates       = await groupsRepo.find(GroupsRelatedToEnrollments(enrollmentsAggregates.entities))
  const courseAggregates      = await coursesRepo.find(CoursesRelatedToEnrollments(enrollmentsAggregates.entities))
  console.log(courseAggregates)

  const getGroup  = (groupId: string)  => groupAggregates.entities.find(x => x.id.value === groupId) as Group
  const getCourse = (courseId: string) => courseAggregates.entities.find(x => x.id.value === courseId) as Course

  // console.log(enrollmentsAggregates.entities.map(x => getCourse(getGroup(x.groupId.value)?.courseId.value) ))


  const result: EnrollmentViewModel[] = []
  for (const enrollment of enrollmentsAggregates.entities) {
    const g = enrollment.groupId ? getGroup(enrollment.groupId.value) : undefined
    const c = getCourse(enrollment.courseId.value)

    result.push({
      id: enrollment.id.value,
      status: enrollment.status,
      courseName: c.title,
      groupName: g?.name,
      imageUrl: g?.couratorAvatarUrl || 'https://placekitten.com/400/400',
      info: !enrollment.isAssignedToGroup ? 'The group is being recruited' : undefined
    })
  }
  enrollments.value = result

  // enrollments.value = enrollmentsAggregates.entities.map(x =>({
  //   id: x.id.value,
  //   status: x.status.toString(),
  // courseName: getCourse(x.courseId.value)?.title,
  //   groupName: getGroup(x.groupId?.value)?.name,
  //   leaderName: getGroup(x.groupId?.value)?.couratorName,
  //   imageUrl: getGroup(x.groupId?.value)?.couratorAvatarUrl || 'https://placekitten.com/400/400',
  //   startsAt: getGroup(x.groupId?.value)?.startsAt,
  // } as EnrollmentViewModel))
  busy.value = false
}
</script>

