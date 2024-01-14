<template>
  <PageWithHeaderLayout
    :title="lesson?.title || ''"
    :has-data="lesson !== undefined"
    @sync-completed="onEnter"
  >
    <template #toolbar>
      <IonToolbar>
        <LessonSectionsList
          v-model="selected"
          :items="sections"
        />
      </IonToolbar>
    </template>

    <LessonSectionView
      v-if="selectedSection !== undefined"
      :blocks="selectedSection.blocks"
      :states="selectedHomework?.work || []"
      @change="onLessonSectionStateChanged"
    />

    <IonButton
      v-if="showSendToReview"
      class="ion-padding"
      expand="block"
      :disabled="!enabledSentToReview"
      @click="onLessonSectionCopleted"
    >
      {{ enabledSentToReview ? $t('send-to-review') : $t('sent-to-review') }}
    </IonButton>
  </PageWithHeaderLayout>
</template>


<script lang="ts" setup>
import { PageWithHeaderLayout } from '@/shared'
import {
  LessonIdentity, LessonSectionsList, LessonSectionView,
  Cache, LessonSection, Lesson, FetchLessonSections, StudentHomework,
  AssessmentMethod, StudentHomeworkStatus, FetchLessonSectionsHomeworks
} from '@/education'
import { computed, onMounted, ref, shallowRef, toRefs, watch } from 'vue'
import { IonToolbar, IonButton, onIonViewWillEnter, useIonRouter } from '@ionic/vue'
import { useRoute } from 'vue-router'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const userId = 'a243727d-57ab-4595-ba17-69f3a0679bf6'
const route = useRoute()
const router = useIonRouter()


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

const selected  = ref(0)
const lesson    = shallowRef<Lesson>()
const sections  = shallowRef<readonly LessonSection[]>([])
const homeworks = shallowRef<readonly StudentHomework[]>([])

const selectedSection  = computed(() => sections.value[selected.value])
const selectedHomework = computed(() => homeworks.value.find(x => x.lessonSectionId.value === selectedSection.value.id.value))

const showSendToReview = computed(() => selectedHomework.value?.assessmentMethod !== AssessmentMethod.NotRequired)
const enabledSentToReview = computed(() => selectedHomework.value && [StudentHomeworkStatus.Open, StudentHomeworkStatus.Returned].includes(selectedHomework.value.status) )

/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

onMounted(onEnter)
onIonViewWillEnter(onEnter)

watch(selected, (v) => {
  if (sections.value[v]) {
    router.replace({
      name:   'lesson',
      params: { lessonId:  props.lessonId.value },
      query:  { sectionId: sections.value[v].id.value },
    })
  }
})

watch([query, sections], () => {
  if (query.value.sectionId) {
    selected.value = sections.value.findIndex(x => x.id.value === query.value.sectionId)
  }
})


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onEnter() {
  await fetchLessonData(props.lessonId)
}

async function onLessonSectionStateChanged(
  data: any
) {
  if (!selectedHomework.value) { return }
  selectedHomework.value.work = data
  Cache.StudentHomeworks.save(selectedHomework.value)
}

async function onLessonSectionCopleted() {
  if (!selectedHomework.value) { return }
  selectedHomework.value.sendToReview()
  await Cache.StudentHomeworks.save(selectedHomework.value)
  // TODO: fetch only homework
  await fetchLessonData(props.lessonId)
}


/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

async function fetchLessonData(
  lessonId: LessonIdentity
) {
  [
    lesson.value,
    sections.value,
  ] = await Promise.all([
    Cache.Lessons.get(lessonId),
    FetchLessonSections(lessonId),
  ])
  homeworks.value = await FetchLessonSectionsHomeworks(userId, sections.value.map(x => x.id))
}
</script>



<fluent locale="en">
send-to-review = Send to review
sent-to-review = Sent
</fluent>

<fluent locale="ru">
send-to-review = Отправить на проверку
sent-to-review = Отправлено
</fluent>