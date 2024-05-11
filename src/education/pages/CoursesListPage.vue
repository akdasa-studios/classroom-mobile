<template>
  <PageWithHeaderLayout
    :title="$t('courses')"
    :has-data="isReady"
    @sync-completed="onSyncCompleted"
  >
    <template #toolbar>
      <IonToolbar>
        <IonSearchbar
          v-model="searchQuery"
          :placeholder="$t('search')"
        />
      </IonToolbar>
    </template>
    <CoursesList
      :items="courses"
      @click="onCourseCardClicked"
    />
  </PageWithHeaderLayout>
</template>


<script setup lang="ts">
import { useAsyncState, watchDebounced } from '@vueuse/core'
import { useIonRouter, IonSearchbar, IonToolbar } from '@ionic/vue'
import { FetchCourses, CoursesList, CourseListItem } from '@/education'
import { PageWithHeaderLayout } from '@/shared'
import { ref } from 'vue'

// --- Dependencies ----------------------------------------------------------
const router = useIonRouter()

// --- State -----------------------------------------------------------------
const searchQuery = ref<string>('')
const { state: courses, execute: fetchCourses, isReady } =
  useAsyncState((value: string) => fetch(value), [],
  { resetOnExecute: false })

// --- Hooks -----------------------------------------------------------------
watchDebounced(searchQuery, (query) => fetchCourses(0, query), { debounce: 500 })

// --- Handlers --------------------------------------------------------------
function onCourseCardClicked(id: string) {
  router.push({ name: 'course', params: { 'id': id } })
}

async function onSyncCompleted() {
  await fetchCourses(0, searchQuery.value)
}

// --- Helpers ---------------------------------------------------------------
async function fetch(query: string): Promise<CourseListItem[]> {
  return await FetchCourses(query)
}
</script>


<fluent locale="en">
courses = Courses
search = Search
</fluent>

<fluent locale="ru">
courses = Курсы
search = Поиск
</fluent>
