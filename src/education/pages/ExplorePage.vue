<template>
  <list-page
    v-slot="sp"
    :items="courses"
    :infinite-scroll-enabled="infiniteScrollEnabled"
    :title="$t('courses')"
    @fetch="onCoursesListFetchRequested"
  >
    <course-card
      :title="sp.item.title"
      :subtitle="sp.item.subtitle"
      :description="sp.item.description"
      :cover-image-url="sp.item.coverImageUrl"
      @click="() => onCourseCardClicked(sp.item.id.toString())"
    />
  </list-page>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { onIonViewDidEnter, useIonRouter } from '@ionic/vue'
import { useTask } from '@/shared'
import { ResponseCode } from '@protocol/core'
import { Course, GetCoursesListTask } from '@protocol/courses'
import { ListPage } from '@/shared'
import { CourseCard } from '@/education'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const router = useIonRouter()
const getCoursesListTask = useTask(new GetCoursesListTask())

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const courses = ref<Course[]>([])
const infiniteScrollEnabled = ref(true)

/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

onIonViewDidEnter(() => onCoursesListFetchRequested(0))


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onCourseCardClicked(
  id: string
) {
  router.push({ name: 'course', params: { 'id': id } })
}

async function onCoursesListFetchRequested(
  offset: number,
  complete?: () => void
) {
  const fetchCount = 4
  const result = await getCoursesListTask.execute({
    count: fetchCount, offset: offset
  })
  if (result.status === ResponseCode.Ok) {
    courses.value = offset === 0
      ? result.data.items
      : courses.value.concat(result.data.items)
    infiniteScrollEnabled.value = result.data.items.length == fetchCount
  }
  if (complete) { complete() }
}
</script>


<fluent locale="en">
courses = Courses
</fluent>
