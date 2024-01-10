<template>
  <LessonsListItem
    v-for="(lesson, idx) in items"
    :key="lesson.id.value"
    :item="items[idx]"
    @click="() => onLessonClicked(lesson.id.value)"
  />
</template>


<script setup lang="ts">
import { Lesson, LessonsListItem } from '@/education'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

defineProps<{
  items: Lesson[]
}>()

const emit = defineEmits<{
  click: [lessonId: string]
}>()


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onLessonClicked(
  lessonId: string
) {
  emit('click', lessonId)
}
</script>
