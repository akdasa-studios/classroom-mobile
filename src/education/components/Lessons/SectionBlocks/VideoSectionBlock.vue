<template>
  <video
    ref="video"
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

  <div class="ion-padding">
    <IonChip
      v-for="timestamp, idx in timestamps"
      :key="timestamp.time"
      :color="getColor(idx)"
      @click="() => onTimestampClicked(timestamp.time)"
    >
      {{ formatSeconds(timestamp.time) }} {{ timestamp.title }}
    </IonChip>
  </div>
</template>


<script lang="ts" setup>
import { onMounted, ref, toRefs, watch } from 'vue'
import { useDownloader } from '@/shared'
import { LessonSectionVideoBlockState, Timestamp } from '@/education'
import { onIonViewWillEnter, IonChip } from '@ionic/vue'

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
  state?: LessonSectionVideoBlockState
}>()

const emit = defineEmits<{
  change: [state: LessonSectionVideoBlockState]
}>()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const localVideoUrl = ref<string>()
const localPosterUrl = ref<string>()
const video = ref()
const currentTime = ref(props.state?.watched || 0)
const { state } = toRefs(props)


/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

watch([
  localVideoUrl, video, state
], () => video.value.currentTime = props.state?.watched || 0)
onMounted(fetchData)
onIonViewWillEnter(fetchData)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onTimestampClicked(time: number) {
  video.value.currentTime = time
}

function onVideoTimeUpdate(event: any) {
  if (!video.value) { return }
  currentTime.value = event.target.currentTime
  emit('change', {
    type: 'video',
    watched: currentTime.value,
    duration: video.value.duration
  })
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
</style>
