<template>
  <lessons-list-item
    v-for="(lesson, idx) in model"
    :key="lesson.id.value"
    v-model="model[idx]"
    @click="() => onLessonClicked(lesson.id.value)"
  />
</template>


<script setup lang="ts">
import { Lesson, LessonsListItem } from '@/education'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const emit = defineEmits<{
  click: [lessonId: string]
}>()

const model = defineModel<readonly Lesson[]>({ required: true })


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onLessonClicked(
  lessonId: string
) {
  emit('click', lessonId)
}
</script>
