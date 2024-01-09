<template>
  <PageWithHeaderLayout
    :title="lesson?.title || ''"
    :has-padding="true"
    :busy="busy"
  >
    <template #content>
      <lesson-sections-list
        class="sectionsList"
        :sections="sections"
        :homeworks="homeworks"
        :active="activeSectionIdx"
        @click="onLessonSectionClicked"
      />

      <lesson-section-view
        v-if="sections[activeSectionIdx]"
        :section="sections[activeSectionIdx]"
        :homework="getHomework(sections[activeSectionIdx].id)"
      />
    </template>
  </PageWithHeaderLayout>
</template>


<script lang="ts" setup>
import { PageWithHeaderLayout } from '@/shared'
import { Lesson, LessonIdentity, LessonSectionIdentity, LessonSection, LessonSectionsList, LessonSectionView, StudentHomework, useSyncTask } from '@/education'
import { computed, onMounted, ref, shallowRef, watch } from 'vue'
import { LessonsDal } from '../../repositories/LessonsDal'

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

const busy      = computed(() => syncTask.busy.value && !lesson.value)
const lesson    = shallowRef<Lesson>()
const sections  = shallowRef<readonly LessonSection[]>([])
const homeworks = shallowRef<readonly StudentHomework[]>([])
const activeSectionIdx = ref(0)


/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

onMounted(onFetchData)
watch(syncTask.completedAt, onFetchData)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onFetchData() {
  lesson.value    = await LessonsDal.getLesson(props.lessonId)
  sections.value  = await LessonsDal.getLessonSections(lesson.value.id)
  homeworks.value = await LessonsDal.getHomework(lesson.value.id)

  if (props.sectionId) {
    const idx = sections.value.findIndex(x => x.id.equals(props.sectionId!))
    if (idx != -1) { activeSectionIdx.value = idx }
  }
}

async function onLessonSectionClicked(index: number) {
  activeSectionIdx.value = index
}


/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

function getHomework(
  lessonSectionId: LessonSectionIdentity
) {
  return homeworks.value.find(x => x.lessonSectionId.equals(lessonSectionId))
}
</script>


<style scoped>
.sectionsList {
  margin-bottom: 1rem;
}
</style>