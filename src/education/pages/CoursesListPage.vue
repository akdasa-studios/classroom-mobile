<template>
  <list-items-page
    v-slot="{ item }"
    :title="$t('courses')"
    :fetcher="fetcher"
  >
    <course-card
      :title="item.title"
      :subtitle="item.subtitle"
      :summary="item.summary"
      :cover-image-url="item.coverImageUrl"
      @click="() => onCourseCardClicked(item.id)"
    />
  </list-items-page>
</template>


<script setup lang="ts">
import { useIonRouter } from '@ionic/vue'
import { ListItemsPage, useRepository } from '@/shared'
import { Course, CourseCard, CourseIdentity } from '@/education'
import { QueryBuilder } from '@framework/persistence'
import { courses } from '@/shared/fixtures'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const router     = useIonRouter()
const repository = useRepository<Course>('course', courses)

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onCourseCardClicked(
  id: CourseIdentity
) {
  router.push({ name: 'course', params: { 'id': id.value } })
}


/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

async function fetcher(searchQuery: string, offset: number, count: number) {
  const qb = new QueryBuilder<Course>()
  const result = await repository.find(
    qb.contains('title', searchQuery
  ), { skip: offset, limit: count })
  return result.entities
}
</script>


<fluent locale="en">
courses = Courses
</fluent>
