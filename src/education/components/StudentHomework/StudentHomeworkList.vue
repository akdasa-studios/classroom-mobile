<template>
  <StudentHomeworkListItem
    v-for="m in items"
    :key="m.studentHomework.id"
    :homework="m.studentHomework"
    :lesson="m.lesson"
    :lesson-section="m.lessonSection"
    @click="onStudentHomeworkClicked"
  />
</template>


<script setup lang="ts">
import {
  HomeworkViewModel, StudentHomeworkListItem,
} from '@/education'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const emit = defineEmits<{
  click: [
    studentHomeworkId: string,
    lessonId: string,
    lessonSectionId: string
  ],
}>()

defineProps<{
  items: HomeworkViewModel[]
}>()


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onStudentHomeworkClicked(
  homeworkId: string,
  lessonId: string,
  lessonSectionId: string,
) {
  emit('click', homeworkId, lessonId, lessonSectionId)
}
</script>
