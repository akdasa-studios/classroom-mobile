<template>
  <with-loader :busy="busy">
    <template #loader>
      <homework-list-item-skeleton />
      <homework-list-item-skeleton />
    </template>

    <template #content>
      <homework-list
        v-model="homework"
        @click="onStudentHomeworkClicked"
      />
    </template>
  </with-loader>
</template>

<script lang="ts" setup>
import {
  StudentHomework, OfStudent, HomeworkList, HomeworkListItemSkeleton,
  LessonSection, Lesson, LessonsById, LessonSectionsById, LessonSectionIdentity, LessonIdentity, HomeworkViewModel, StudentHomeworkIdentity
} from '@/education'
import { WithLoader, useRepository } from '@/shared'
import { lessonSectionFixtures, lessonsFixtures, studentHomeworks } from '@/shared/fixtures'
import { useIonRouter } from '@ionic/vue'
import { onMounted, ref, shallowRef } from 'vue'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const router = useIonRouter()
const studentHomeworksRepo = useRepository<StudentHomework>('student-homework', studentHomeworks)
const lessonSectionsRepo   = useRepository<LessonSection>('lesson-section', lessonSectionFixtures)
const lessonsRepo          = useRepository<Lesson>('lesson', lessonsFixtures)


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const homework = shallowRef<readonly HomeworkViewModel[]>([])
const busy = ref(false)


/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

onMounted(onEnter)


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


async function onEnter() {
  busy.value = true

  const userId            = 'a243727d-57ab-4595-ba17-69f3a0679bf6'

  const studentHomeworks = await studentHomeworksRepo.find(OfStudent(userId))
  const lessonSections   = await lessonSectionsRepo.find(LessonSectionsById(studentHomeworks.entities.map(x => x.lessonSectionId)))
  const lessons          = await lessonsRepo.find(LessonsById(lessonSections.entities.map(x => x.lessonId)))

  const getLessonSection = (lessonSectionId: LessonSectionIdentity) => lessonSections.entities.find(x => x.id.equals(lessonSectionId))
  const getLesson        = (lessonId: LessonIdentity)               => lessons.entities.find(x => x.id.equals(lessonId))

  const viewModels: HomeworkViewModel[] = []
  for (const studentHomework of studentHomeworks.entities) {
    const lessonSection = getLessonSection(studentHomework.lessonSectionId)!
    const lesson        = getLesson(lessonSection!.lessonId)!
    viewModels.push({ studentHomework, lesson, lessonSection })
  }
  homework.value = viewModels

  console.log(viewModels)

  busy.value = false
}
</script>

