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
        :active="activeSectionIdx"
        @click="onLessonSectionClicked"
      />

      <lesson-section-view
        v-if="sections[activeSectionIdx]"
        :section="sections[activeSectionIdx]"
      />
    </template>
  </PageWithHeaderLayout>
</template>


<script lang="ts" setup>
import { PageWithHeaderLayout, useRepository } from '@/shared'
import { Lesson, LessonIdentity, LessonSectionIdentity, LessonSection, LessonSectionsList, LessonSectionView, OfLesson } from '@/education'
import { lessonsFixtures, lessonSectionFixtures } from '@/shared/fixtures'
import { onMounted, ref, shallowRef } from 'vue'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const lessonsRepo = useRepository<Lesson>('lesson', lessonsFixtures)
const lessonSectionsRepo = useRepository<LessonSection>('lesson-section', lessonSectionFixtures)


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

const lesson = shallowRef<Lesson>()
const sections = shallowRef<readonly LessonSection[]>([])
const activeSectionIdx = ref(0)
const busy = ref(false)

/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

onMounted(onEnter)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onEnter() {
  busy.value = true
  lesson.value = await lessonsRepo.get(props.lessonId)
  sections.value = (await lessonSectionsRepo.find(OfLesson(props.lessonId))).entities
  if (props.sectionId) {
    const idx = sections.value.findIndex(x => x.id.equals(props.sectionId!))
    if (idx != -1) { activeSectionIdx.value = idx }
  }
  busy.value = false
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