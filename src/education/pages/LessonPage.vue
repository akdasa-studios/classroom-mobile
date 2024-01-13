<template>
  <PageWithHeaderLayout
    :title="lesson?.title || ''"
  >
    <template #toolbar>
      <IonToolbar>
        <LessonSectionsList
          :items="sections"
          :selected="activeSectionIdx"
          @click="onLessonSectionClicked"
        />
      </IonToolbar>
    </template>

    <LessonSectionView
      v-if="activeSection !== undefined"
      :section="activeSection"
      :states="activeSectionState"
      @change="onLessonSectionStateChanged"
    />
  </PageWithHeaderLayout>
</template>


<script lang="ts" setup>
import { PageWithHeaderLayout } from '@/shared'
import {
  LessonIdentity, LessonSectionsList, LessonSectionView,
  useSyncTask, Cache, LessonSection, Lesson, LessonSectionIdentity, LessonSectionBlockState,
  FetchLessonSectionState, FetchLessonSections, FetchLessonSectionHomework
} from '@/education'
import { computed, shallowRef, toRefs, watch } from 'vue'
import { IonToolbar, onIonViewWillEnter } from '@ionic/vue'
import { useRoute } from 'vue-router'
import { UuidIdentity } from '@framework/domain'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const syncTask = useSyncTask()
const userId = 'a243727d-57ab-4595-ba17-69f3a0679bf6'
const route = useRoute()


/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  lessonId: LessonIdentity
}>()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const { query } = toRefs(route)
const lesson   = shallowRef<Lesson>()
const sections = shallowRef<readonly LessonSection[]>([])
const activeSection = shallowRef<LessonSection>()
const activeSectionState = shallowRef<LessonSectionBlockState[]>([])
const activeSectionIdx = computed(() => activeSection.value ? sections.value.findIndex((x) => x.id.value === activeSection.value?.id.value) : 0)


/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

onIonViewWillEnter(
  () => fetchLessonData(props.lessonId)
)

watch(
  [syncTask.completedAt],
  () => fetchLessonData(props.lessonId)
)

watch(query, (v) => {
  if (!v.sectionId) { return }
  fetchLessonSectionData(new UuidIdentity(v.sectionId as string), userId)
}, { immediate: true })


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onLessonSectionClicked(
  lessonSectionId: LessonSectionIdentity
) {
  await fetchLessonSectionData(lessonSectionId, userId)
}

async function onLessonSectionStateChanged(
  data: any
) {
  const homework = await FetchLessonSectionHomework(
    userId, activeSection.value!.id
  )

  if (homework) {
    homework.work = data
    Cache.StudentHomeworks.save(homework)
  }
}

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

async function fetchLessonData(
  lessonId: LessonIdentity
) {
  lesson.value   = await Cache.Lessons.get(lessonId)
  sections.value = await FetchLessonSections(lessonId)
}

async function fetchLessonSectionData(
  lessonSectionId: LessonSectionIdentity,
  userId: string,
) {
  activeSection.value      = await Cache.LessonSections.get(lessonSectionId)
  activeSectionState.value = await FetchLessonSectionState(userId, lessonSectionId)
}
</script>
