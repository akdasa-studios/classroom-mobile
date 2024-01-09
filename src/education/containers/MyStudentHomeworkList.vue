<template>
  <with-loader :busy="busy">
    <template #loader>
      <with-list-header :title="$t('homework')">
        <homework-list-item-skeleton />
        <homework-list-item-skeleton />
      </with-list-header>
    </template>

    <template #content>
      <with-list-header :title="$t('homework')">
        <homework-list
          v-model="homework"
          @click="onStudentHomeworkClicked"
        />
      </with-list-header>
    </template>
  </with-loader>
</template>

<script lang="ts" setup>
import {
  Cache, OfStudent, HomeworkList, HomeworkListItemSkeleton,
  LessonSectionIdentity, LessonIdentity, HomeworkViewModel, StudentHomeworkIdentity
} from '@/education'
import { WithLoader, WithListHeader } from '@/shared'
import { useIonRouter } from '@ionic/vue'
import { shallowRef } from 'vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

defineProps<{
  busy: boolean
}>()

defineExpose({
  sync: fetchData
})

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const router = useIonRouter()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const homework = shallowRef<readonly HomeworkViewModel[]>([])


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onStudentHomeworkClicked(
  homeworkId: StudentHomeworkIdentity,
  lessonId: LessonIdentity,
  lessonSectionId: LessonSectionIdentity,
) {
  router.push({
    name: 'lesson-section',
    params: {
      id: lessonId.value,
      sectionId: lessonSectionId.value
    }
  })
}


/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

async function fetchData() {
  const userId           = 'a243727d-57ab-4595-ba17-69f3a0679bf6'
  const studentHomeworks = await Cache.StudentHomeworks.find(OfStudent(userId))

  homework.value = await Promise.all(
    studentHomeworks.entities.map(async x => ({
      studentHomework: x,
      lessonSection:   await Cache.LessonSections.get(x.lessonSectionId),
      lesson:          await Cache.Lessons.get(
        (await Cache.LessonSections.get(x.lessonSectionId)).lessonId // TODO
      )
    } as HomeworkViewModel))
  )
}
</script>


<fluent locale="en">
homework    = Homework
</fluent>

<fluent locale="ru">
homework    = Домашняя работа
</fluent>