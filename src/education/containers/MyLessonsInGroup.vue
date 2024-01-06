<template>
  <with-loader :busy="busy">
    <template #loader>
      <lessons-list-item-skeleton />
      <lessons-list-item-skeleton />
    </template>

    <template #content>
      <lessons-list
        v-model="lessons"
        @click="onLessonClicked"
      />
    </template>
  </with-loader>
</template>

<script lang="ts" setup>
import { WithLoader, useRepository } from '@/shared'
import { groupsFixtures, lessonsFixtures } from '@/shared/fixtures'
import { useIonRouter } from '@ionic/vue'
import { onMounted, ref, shallowRef } from 'vue'
import { Lesson, OfCourse, LessonsList, LessonsListItemSkeleton, Group, GroupIdentity } from '@/education'


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const router = useIonRouter()
const lessonsRepo = useRepository<Lesson>('lesson', lessonsFixtures)
const groupsRepo  = useRepository<Group>('group', groupsFixtures)


/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  groupId: GroupIdentity
}>()

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const lessons = shallowRef<readonly Lesson[]>([])
const busy = ref(false)


/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

onMounted(onEnter)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onLessonClicked(
  id: string
) {
  router.push({name: 'lesson', params: { id } })
}

async function onEnter() {
  busy.value = true

  const groupAggregate    = await groupsRepo.get(props.groupId)
  const lessonsAggregates = await lessonsRepo.find(OfCourse(groupAggregate.courseId.value))

  lessons.value = lessonsAggregates.entities

  busy.value = false
}
</script>

