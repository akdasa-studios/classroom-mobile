<template>
  <PageWithHeaderLayout
    :title="lesson?.title || ''"
    :has-padding="true"
  >
    <LessonSectionView
      v-if="section !== undefined"
      :section="section"
      :states="states"
      @change="onLessonSectionStateChange"
    />
  </PageWithHeaderLayout>
</template>


<script lang="ts" setup>
import { PageWithHeaderLayout } from '@/shared'
import {
  Lesson, LessonIdentity, LessonSectionIdentity,
  LessonSectionView, useSyncTask, Cache, LessonSection, OfStudentAndLessonSections, StudentHomework, LessonSectionBlockState
} from '@/education'
import { onMounted, shallowRef, watch } from 'vue'
import { onIonViewWillEnter } from '@ionic/vue'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const syncTask = useSyncTask()


/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  lessonId: LessonIdentity,
  sectionId: LessonSectionIdentity
}>()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const lesson = shallowRef<Lesson>()
const section = shallowRef<LessonSection>()
const states = shallowRef<LessonSectionBlockState[]>([])
const homework = shallowRef<StudentHomework>()


/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

onMounted(onFetchData)
onIonViewWillEnter(onFetchData)
watch(syncTask.completedAt, onFetchData)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onFetchData() {
  const homeworks = await Cache.StudentHomeworks.find(
    OfStudentAndLessonSections('a243727d-57ab-4595-ba17-69f3a0679bf6', [props.sectionId])
  )
  if (homeworks.entities.length > 0) {
    homework.value = homeworks.entities[0]
  }

  if (homework.value) {
    states.value = homework.value.work || []
  }
  section.value = await Cache.LessonSections.get(props.sectionId)
}

async function onLessonSectionStateChange(data: any) {
  console.log('STATE CHANGED', data)
  if (!homework.value) { return }
  homework.value.work = data

  // sections.value[sectionIdx].work = data
  // const homeworkId = sections.value[sectionIdx].homeworkId
  // if (!homeworkId) { return }

  // const homework = await Cache.StudentHomeworks.get(new UuidIdentity(homeworkId))
  // homework.work = data
  Cache.StudentHomeworks.save(homework.value)
}
</script>


<style scoped>
.sectionsList {
  margin-bottom: 1rem;
}
</style>