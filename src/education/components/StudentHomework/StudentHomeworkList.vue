<template>
  <StudentHomeworkListItem
    v-for="m in items"
    :key="m.studentHomework.id.value"
    :homework="m.studentHomework"
    :lesson="m.lesson"
    :lesson-section="m.lessonSection"
    @click="onStudentHomeworkClicked"
  />
</template>


<script setup lang="ts">
import {
  HomeworkViewModel, StudentHomeworkListItem, StudentHomeworkIdentity,
  LessonIdentity, LessonSectionIdentity
} from '@/education'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const emit = defineEmits<{
  click: [
    studentHomeworkId: StudentHomeworkIdentity,
    lessonId: LessonIdentity,
    lessonSectionId: LessonSectionIdentity
  ],
}>()

defineProps<{
  items: HomeworkViewModel[]
}>()


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onStudentHomeworkClicked(
  homeworkId: StudentHomeworkIdentity,
  lessonId: LessonIdentity,
  lessonSectionId: LessonSectionIdentity,
) {
  emit('click', homeworkId, lessonId, lessonSectionId)
}
</script>
