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
import { WithLoader } from '@/shared'
import { useIonRouter } from '@ionic/vue'
import { computed, shallowRef } from 'vue'
import { Lesson, OfCourse, LessonsList, LessonsListItemSkeleton, GroupIdentity, Cache } from '@/education'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  busy: boolean,
  groupId: GroupIdentity
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

const lessons = shallowRef<readonly Lesson[]>([])
const busy    = computed(() => props.busy && lessons.value.length === 0)



/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onLessonClicked(
  id: string
) {
  router.push({name: 'lesson', params: { id } })
}


/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

async function fetchData() {
  const group    = await Cache.Groups.get(props.groupId)
  const _lessons = await Cache.Lessons.find(OfCourse(group.courseId.value))
  lessons.value = _lessons.entities
}
</script>

