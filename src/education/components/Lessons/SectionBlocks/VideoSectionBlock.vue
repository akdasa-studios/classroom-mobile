<template>
  <with-loader
    :busy="busy"
  >
    <template #content>
      <video
        ref="video"
        :poster="localPosterUrl"
        controls
        class="video"
      >
        <source
          v-if="localVideoUrl"
          :src="localVideoUrl"
          type="video/mp4"
        >
      </video>

      <div
        v-for="timestamp in timestamps"
        :key="timestamp.time"
        @click="() => onTimestampClicked(timestamp.time)"
      >
        <span
          class="timestamp"
        >
          {{ formatSeconds(timestamp.time) }}
        </span> : {{ timestamp.title }}
      </div>
    </template>
  </with-loader>
</template>


<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { WithLoader, useDownloader } from '@/shared'
import { Timestamp } from '@/education'

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
  timestamps: Timestamp[]
}>()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const busy = ref(false)
const localVideoUrl = ref<string>()
const localPosterUrl = ref<string>()
const video = ref()

/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

onMounted(onEnter)

/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onEnter() {
  // busy.value = true
  try {
    localVideoUrl.value = await downloader.download(props.videoUrl)
    localPosterUrl.value = await downloader.download(props.posterUrl)
  } catch (ex) {
    alert(ex)
  }
  // busy.value = false
}

function onTimestampClicked(time: number) {
  video.value.currentTime = time
}

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

function formatSeconds(seconds: number) {
  if (seconds < 3600) {
    return new Date(seconds * 1000).toISOString().substring(14, 19)
  } else {
    return new Date(seconds * 1000).toISOString().substring(11, 19)
  }
}
</script>


<style scoped>
.video {
  width: 100%;
}

.timestamp {
  color: var(--ion-color-primary);
  font-family: 'Courier New', Courier, monospace;
  font-variant-numeric: tabular-nums;
}
</style>
