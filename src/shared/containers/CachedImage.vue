<template>
  <IonSkeletonText
    v-if="downloader.isDownloading.value && !cachedUrl"
    :animated="true"
    class="img"
  />
  <img
    v-else
    :src="cachedUrl"
  >
</template>

<script setup lang="ts">
import { onMounted, ref, toRefs, watch } from 'vue'
import { useDownloader } from '@/shared'
import { IonSkeletonText } from '@ionic/vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  url?: string
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
    cachedUrl.value = await downloader.download(url.value)
  } catch (err) {
    cachedUrl.value = props.url
    alert(err)
  }
}
</script>


<style scoped>
.img {
  height: 128px;
  margin: 0px;
}
</style>