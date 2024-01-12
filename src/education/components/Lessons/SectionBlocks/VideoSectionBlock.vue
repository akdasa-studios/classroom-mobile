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
        @timeupdate="onVideoTimeUpdate"
      >
        <source
          v-if="localVideoUrl"
          :src="localVideoUrl"
          type="video/mp4"
        >
      </video>

      <IonChip
        v-for="timestamp, idx in timestamps"
        :key="timestamp.time"
        :color="getColor(idx)"
        @click="() => onTimestampClicked(timestamp.time)"
      >
        {{ formatSeconds(timestamp.time) }} {{ timestamp.title }}
      </IonChip>
    </template>
  </with-loader>
</template>


<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { WithLoader, useDownloader } from '@/shared'
import { Timestamp } from '@/education'
import { IonChip, onIonViewWillEnter } from '@ionic/vue'

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
const currentTime = ref(0)


/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

onMounted(fetchData)
onIonViewWillEnter(fetchData)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onTimestampClicked(time: number) {
  video.value.currentTime = time
}

function onVideoTimeUpdate(event: any) {
  currentTime.value = event.target.currentTime
}


/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

async function fetchData() {
  try {
    localVideoUrl.value = await downloader.download(props.videoUrl)
    localPosterUrl.value = await downloader.download(props.posterUrl)
  } catch (ex) {
    alert(ex)
  }
}

function getColor(idx: number) {
  return (currentTime.value >= (props.timestamps[idx+0].time)
       && currentTime.value <  (props.timestamps[idx+1]?.time || 99999))
       ? 'primary' : undefined
}

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
