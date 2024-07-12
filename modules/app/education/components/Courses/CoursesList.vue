<template>
  <CourseCard
    v-for="item in items"
    :key="item.id"
    :title="item.title"
    :subtitle="item.subtitle"
    :summary="item.summary"
    :cover-image-url="item.coverImageUrl"
    @click="() => onCourseCardClicked(item.id)"
  />
</template>

<script setup lang="ts">
import CourseCard from './CourseCard.vue'

// --- Interface -------------------------------------------------------------
export type CourseListItem = {
  id: string
  title: string
  subtitle: string
  summary: string
  coverImageUrl: string
}

defineProps<{
  items: CourseListItem[]
}>()

const emit = defineEmits<{
  click: [courseId: string]
}>()

// --- Handlers --------------------------------------------------------------
function onCourseCardClicked(courseId: string) {
  emit('click', courseId)
}
</script>