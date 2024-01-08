<template>
  <with-loader
    :busy="busy"
  >
    <template #content>
      <video
        :poster="localPosterUrl"
        controls
        class="video"
      >
        <source
          :src="localVideoUrl"
          type="video/mp4"
        >
      </video>
    </template>
  </with-loader>
</template>


<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { WithLoader, useDownloader } from '@/shared'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const downloader = useDownloader()


/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  videoUrl: string
  posterUrl: string
}>()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const busy = ref(false)
const localVideoUrl = ref<string>()
const localPosterUrl = ref<string>()

/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

onMounted(onEnter)

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onEnter() {
  busy.value = true
  localVideoUrl.value = await downloader.download(props.videoUrl)
  localPosterUrl.value = await downloader.download(props.posterUrl)
  busy.value = false
}
</script>


<style scoped>
.video {
  width: 100%;
}
</style>
