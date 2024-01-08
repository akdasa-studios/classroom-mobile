<template>
  <homework-list-item
    v-for="m in model"
    :key="m.studentHomework.id.value"
    :homework="m.studentHomework"
    :lesson="m.lesson"
    :lesson-section="m.lessonSection"
    @click="onStudentHomeworkClicked"
  />
</template>


<script setup lang="ts">
import {
  HomeworkViewModel, HomeworkListItem, StudentHomeworkIdentity,
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

const model = defineModel<readonly HomeworkViewModel[]>({ required: true })


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
