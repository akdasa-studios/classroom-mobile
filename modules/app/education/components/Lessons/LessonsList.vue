<template>
  <WithListHeader
    :title="$t('lessons')"
  >
    <LessonsListItem
      v-for="(lesson, idx) in items"
      :key="lesson.id"
      :item="items[idx]"
      @click="() => onLessonClicked(lesson.id)"
    />
  </WithListHeader>
</template>


<script setup lang="ts">
import { Lesson, LessonsListItem } from '@classroom/app/education'
import { WithListHeader } from '@classroom/app/shared'
/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

defineProps<{
  items: readonly Lesson[]
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
