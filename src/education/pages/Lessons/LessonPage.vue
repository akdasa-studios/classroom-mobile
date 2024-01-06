<template>
  <PageWithHeaderLayout
    title="Lesson"
    :has-padding="true"
    :busy="busy"
  >
    <template #content>
      <video
        v-if="localUrl"
        poster="https://www.giantfreakinrobot.com/wp-content/uploads/2022/08/rick-astley.jpg"
        controls
        class="video"
      >
        <source
          :src="localUrl"
          type="video/mp4"
        >
      </video>
      <!-- eslint-disable-next-line vue/no-v-html -->
      <div v-html="renderedContent" />
    </template>
  </PageWithHeaderLayout>
</template>


<script lang="ts" setup>
import { PageWithHeaderLayout, useDownloader, useRepository } from '@/shared'
import { Lesson, LessonIdentity } from '@/education'
import { lessonsFixtures } from '@/shared/fixtures'
import { onMounted, ref, shallowRef } from 'vue'
import { Marked } from '@ts-stack/markdown'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const lessonsRepo = useRepository<Lesson>('lessons', lessonsFixtures)
const downloader = useDownloader()


/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  lessonId: LessonIdentity
}>()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const lesson = shallowRef<Lesson>()
const renderedContent = ref('')
const busy = ref(false)

const url = 'https://filebin.net/k9svui6oh73vtgmm/x2mate.com-Rick_Astley_-_Never_Gonna_Give_You_Up__Official_Music_Video_-_480p_.mp4'
const localUrl = ref<string|undefined>(undefined)

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
  renderedContent.value = Marked.parse(lesson.value.content)
  busy.value = false

  localUrl.value = await downloader.download(url)
}
</script>


<style>
.video {
  width: 100%;
}
</style>
