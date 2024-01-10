<template>
  <CourseCard
    v-for="item in items"
    :key="item.id.value"
    :title="item.title"
    :subtitle="item.subtitle"
    :summary="item.summary"
    :cover-image-url="item.coverImageUrl"
    @click="() => onCourseCardClicked(item.id)"
  />
</template>

<script setup lang="ts">
import { Course, CourseCard, CourseIdentity } from '@/education'


/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

defineProps<{
  items: readonly Course[]
}>()

const emit = defineEmits<{
  click: [courseId: CourseIdentity]
}>()


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onCourseCardClicked(
  courseId: CourseIdentity
) {
  emit('click', courseId)
}
</script>