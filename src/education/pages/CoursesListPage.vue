<template>
  <PageWithHeaderLayout
    :title="$t('courses')"
    :busy="syncTask.busy.value && !hasData"
  >
    <template #toolbar>
      <IonToolbar>
        <IonSearchbar
          v-model="searchQuery"
          :placeholder="$t('search')"
        />
      </IonToolbar>
    </template>

    <CourseCard
      v-for="item in courses"
      :key="item.id.value"
      :title="item.title"
      :subtitle="item.subtitle"
      :summary="item.summary"
      :cover-image-url="item.coverImageUrl"
      @click="() => onCourseCardClicked(item.id)"
    />
  </PageWithHeaderLayout>
</template>


<script setup lang="ts">
import { onIonViewDidEnter, useIonRouter, IonSearchbar, IonToolbar } from '@ionic/vue'
import { Cache, Course, CourseCard, CourseIdentity, useSyncTask } from '@/education'
import { PageWithHeaderLayout } from '@/shared'
import { QueryBuilder } from '@framework/persistence'
import { computed, ref, shallowRef, watch } from 'vue'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const router = useIonRouter()
const syncTask = useSyncTask()

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const searchQuery = ref<string>('')
const courses = shallowRef<readonly Course[]>([])
const hasData = computed(() => courses.value.length !== 0)


/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

watch(syncTask.completedAt, onFetchData)
watch(searchQuery, onFetchData)
onIonViewDidEnter(onFetchData)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onCourseCardClicked(
  id: CourseIdentity
) {
  router.push({ name: 'course', params: { 'id': id.value } })
}

async function onFetchData() {
  const qb = new QueryBuilder<Course>()
  courses.value = (await Cache.Courses.find(
    qb.contains('title', searchQuery.value
  ))).entities
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