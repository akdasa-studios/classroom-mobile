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
  LessonSectionsList, LessonSectionView,
  Database, LessonSection, Lesson, FetchLessonSections, StudentHomework,
  FetchLessonSectionsHomeworks
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
  lessonId: string
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
const selectedHomework = computed(() => homeworks.value.find(x => x.lessonSectionId === selectedSection.value.id))

const showSendToReview = computed(() => selectedHomework.value?.assessmentMethod !== 'not-required')
const enabledSentToReview = computed(() => selectedHomework.value && ['open', 'returned'].includes(selectedHomework.value.status) )

/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

onMounted(onEnter)
onIonViewWillEnter(onEnter)

watch(selected, (v) => {
  if (sections.value[v]) {
    router.replace({
      name:   'lesson',
      params: { lessonId:  props.lessonId },
      query:  { sectionId: sections.value[v].id },
    })
  }
})

watch([query, sections], () => {
  if (query.value.sectionId) {
    selected.value = sections.value.findIndex(x => x.id === query.value.sectionId)
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
  selectedHomework.value.setWork(data)
  Database.StudentHomeworks.save(selectedHomework.value)
}

async function onLessonSectionCopleted() {
  if (!selectedHomework.value) { return }
  selectedHomework.value.submit()
  await Database.StudentHomeworks.save(selectedHomework.value)
  // TODO: fetch only homework
  await fetchLessonData(props.lessonId)
}


/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

async function fetchLessonData(
  lessonId: string
) {
  [
    lesson.value,
    sections.value,
  ] = await Promise.all([
    Database.Lessons.get(lessonId),
    FetchLessonSections(lessonId),
  ])
  homeworks.value = await FetchLessonSectionsHomeworks(userId, sections.value.map(x => x.id))
  console.log(homeworks.value)
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