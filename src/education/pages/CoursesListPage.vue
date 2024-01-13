<template>
  <PageWithHeaderLayout
    :title="$t('courses')"
    :has-data="courses.length > 0"
    @sync-completed="onFetchData"
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
import { useIonRouter, IonSearchbar, IonToolbar, onIonViewWillEnter } from '@ionic/vue'
import { Course, CourseIdentity, FetchCourses, CoursesList } from '@/education'
import { PageWithHeaderLayout } from '@/shared'
import { onMounted, ref, shallowRef, watch } from 'vue'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const router = useIonRouter()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const searchQuery = ref<string>('')
const courses = shallowRef<readonly Course[]>([])


/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

watch(searchQuery, onFetchData)
onIonViewWillEnter(onFetchData)
onMounted(onFetchData)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onCourseCardClicked(
  id: CourseIdentity
) {
  router.push({ name: 'course', params: { 'id': id.value } })
}

async function onFetchData() {
  courses.value = await FetchCourses(searchQuery.value)
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
