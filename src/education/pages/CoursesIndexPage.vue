<template>
  <list-items-with-task-page
    v-slot="{ item }"
    :title="$t('courses')"
    :task="task"
    :request-middleware="requestMiddleware"
    :fetch-count="2"
    @search="onSearchQueryChanged"
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
import { ListItemsWithTaskPage, useCachedPaginatedTask } from '@/shared'
import { CoursesCache, CourseCard, GetCoursesListTask } from '@/education'
import { GetCoursesListRequest } from '@protocol/courses'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const router = useIonRouter()
const task   = useCachedPaginatedTask(
  new GetCoursesListTask(),
  new CoursesCache(),
  (req) => ({
      title: req.title,
      offset: req.offset,
      count: req.count
  })
)

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

let searchQuery = ''


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onCourseCardClicked(
  id: string
) {
  router.push({ name: 'course', params: { 'id': id } })
}

function requestMiddleware(
  mode: string,
  request: GetCoursesListRequest
): GetCoursesListRequest {
  if (mode === 'refresh') { task.invalidate() }
  return { title: searchQuery, ...request }
}

function onSearchQueryChanged(
  query: string
) {
  searchQuery = query
}
</script>


<fluent locale="en">
courses = Courses
</fluent>
