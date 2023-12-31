<template>
  <list-items-with-task-page
    v-slot="{ item }"
    :title="$t('courses')"
    :task="task"
    :fetch-count="4"
  >
    <course-card
      :title="item.title"
      :subtitle="item.subtitle"
      :description="item.description"
      :cover-image-url="item.coverImageUrl"
      @click="() => onCourseCardClicked(item.id.toString())"
    />
  </list-items-with-task-page>
</template>


<script setup lang="ts">
import { useIonRouter } from '@ionic/vue'
import { GetCoursesListTask } from '@protocol/courses'
import { ListItemsWithTaskPage } from '@/shared'
import { CourseCard } from '@/education'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const router = useIonRouter()
const task =  new GetCoursesListTask()


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onCourseCardClicked(
  id: string
) {
  router.push({ name: 'course', params: { 'id': id } })
}
</script>


<fluent locale="en">
courses = Courses
</fluent>
