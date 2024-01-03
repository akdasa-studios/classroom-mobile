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
      :summary="item.summary"
      :cover-image-url="item.coverImageUrl"
      @click="() => onCourseCardClicked(item.id.toString())"
    />
  </list-items-with-task-page>
</template>


<script setup lang="ts">
import { useIonRouter } from '@ionic/vue'
import { CachingTask, ListItemsWithTaskPage, serviceLocator } from '@/shared'
import { CoursesCache, CourseCard, GetCoursesListTask, GetCoursesListFromCacheTask } from '@/education'
import { GetCoursesListRequest, GetCoursesListResponse } from '@protocol/courses'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const cache  = serviceLocator.get<CoursesCache>('coursesCache')
const router = useIonRouter()
const task   =
  new CachingTask(
    new GetCoursesListTask(),
    new GetCoursesListFromCacheTask(cache),
    async (res: GetCoursesListResponse): Promise<void> => {
      return await cache.save(res.items)
    }
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
