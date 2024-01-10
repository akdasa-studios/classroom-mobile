<template>
  <PageWithHeaderLayout
    :title="lesson?.title || ''"
    :has-padding="true"
    :busy="busy"
  >
    <LessonSectionsList
      class="sectionsList"
      :items="sections"
      :active="activeSectionIdx"
      @click="onLessonSectionClicked"
    />

    <LessonSectionView
      v-if="sections[activeSectionIdx]"
      :section="sections[activeSectionIdx]"
    />
  </PageWithHeaderLayout>
</template>


<script lang="ts" setup>
import { PageWithHeaderLayout } from '@/shared'
import {
  Lesson, LessonIdentity, LessonSectionIdentity, LessonSectionsList,
  LessonSectionView, useSyncTask, LessonSectionViewModel,
} from '@/education'
import { computed, onMounted, ref, shallowRef, watch } from 'vue'
import { LessonsDal } from '../repositories/LessonsDal'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const syncTask = useSyncTask()


/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  lessonId: LessonIdentity
  sectionId?: LessonSectionIdentity
}>()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const busy = computed(() => syncTask.busy.value && !lesson.value)
const lesson = shallowRef<Lesson>()
const activeSectionIdx = ref(0)
const sections = shallowRef<LessonSectionViewModel[]>([])


/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

onMounted(onFetchData)
watch(syncTask.completedAt, onFetchData)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onFetchData() {
  lesson.value = await LessonsDal.getLesson(props.lessonId)
  const result = await LessonsDal.getLessonSections(lesson.value.id)

  sections.value = await Promise.all(
    result.map(async (x) => ({
      id: x.id.value,
      title: x.title,
      state: (await LessonsDal.getHomeworkOfSection(x.id))?.state || 'unknown',
      blocks: x.blocks
    } as LessonSectionViewModel))
  )

  if (props.sectionId) {
    const idx = sections.value.findIndex(x => x.id === props.sectionId?.value)
    if (idx != -1) { activeSectionIdx.value = idx }
  }
}

async function onLessonSectionClicked(index: number) {
  activeSectionIdx.value = index
}
</script>


<style scoped>
.sectionsList {
  margin-bottom: 1rem;
}
</style>