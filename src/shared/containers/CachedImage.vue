<template>
  <IonSkeletonText
    v-if="downloader.isDownloading.value || !cachedUrl"
    :animated="true"
    :style="{ height: loadingHeight }"
    class="img"
  />
  <img
    v-else
    :src="cachedUrl"
  >
</template>

<script setup lang="ts">
import { onMounted, ref, toRefs, watch } from 'vue'
import { useDownloader } from '@/shared/composables/useDownloader'
import { IonSkeletonText } from '@ionic/vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  url?: string
  loadingHeight?: string
}>()


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const downloader = useDownloader()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const { url } = toRefs(props)
const cachedUrl = ref<string>()


/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

onMounted(onDownload)
watch(url, onDownload)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onDownload() {
  if (!url.value) { return }
  try {
    const isRemoteImage = url.value.startsWith('http://') || url.value.startsWith('https://')
    if (isRemoteImage) {
      cachedUrl.value = await downloader.download(url.value)
    } else {
      cachedUrl.value = url.value
    }
  } catch (err) {
    cachedUrl.value = props.url
  }
}
</script>


<style scoped>
.img {
  margin: 0px;
}
</style>