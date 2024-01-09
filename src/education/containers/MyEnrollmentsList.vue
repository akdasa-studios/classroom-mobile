<template>
  <with-loader :busy="busy && enrollments.length === 0">
    <template #loader>
      <with-list-header :title="$t('my-enrollments')">
        <enrollments-list-item-skeleton />
        <enrollments-list-item-skeleton />
      </with-list-header>
    </template>

    <template #content>
      <with-list-header :title="$t('my-enrollments')">
        <enrollments-list
          :enrollments="enrollments"
          @click="onEnrollmentClicked"
        />
      </with-list-header>
    </template>
  </with-loader>
</template>

<script lang="ts" setup>
import {
  EnrollmentsList, EnrollmentViewModel,
  EnrollmentsListItemSkeleton, OfUser,
  Cache, EnrollmentIdentity,
} from '@/education'
import { WithListHeader, WithLoader } from '@/shared'
import { useIonRouter } from '@ionic/vue'
import { shallowRef } from 'vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

defineProps<{
  busy: boolean
}>()


defineExpose({
  sync: fetchData
})


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const router = useIonRouter()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const enrollments = shallowRef<EnrollmentViewModel[]>([])


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onEnrollmentClicked(
  id: EnrollmentIdentity
) {
  router.push({name: 'my-enrollment', params: { id: id.value } })
}


/* -------------------------------------------------------------------------- */
/*                                   Hekpers                                  */
/* -------------------------------------------------------------------------- */

async function fetchData() {
  const userId   = 'a243727d-57ab-4595-ba17-69f3a0679bf6'
  const entities = (await Cache.Enrollments.find(OfUser(userId))).entities

  enrollments.value = await Promise.all(
    entities.map(async (x) => ({
      enrollment: x,
      group:      x.groupId ? await Cache.Groups.get(x.groupId) : undefined,
      course:     await Cache.Courses.get(x.courseId)
    } as EnrollmentViewModel))
  )
}
</script>

<fluent locale="en">
my-enrollments = My Groups
</fluent>

<fluent locale="ru">
my-enrollments = Мои группы
</fluent>