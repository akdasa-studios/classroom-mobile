<template>
  <WithListHeader
    :title="$t('lessons')"
  >
    <LessonsListItem
      v-for="(lesson, idx) in items"
      :key="lesson.id.value"
      :item="items[idx]"
      @click="() => onLessonClicked(lesson.id.value)"
    />
  </WithListHeader>
</template>


<script setup lang="ts">
import { Lesson, LessonsListItem } from '@/education'
import { WithListHeader } from '@/shared'
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


<fluent locale="en">
lessons = Lessons
</fluent>

<fluent locale="ru">
lessons = Уроки
</fluent>
