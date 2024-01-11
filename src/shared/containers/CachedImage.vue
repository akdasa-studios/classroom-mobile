<template>
  <IonSkeletonText
    v-if="downloader.isDownloading.value"
    :animated="true"
    class="img"
  />
  <img
    v-else
    :src="cachedUrl"
  >
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useDownloader } from '@/shared'
import { IonSkeletonText } from '@ionic/vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  url: string
}>()

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const downloader = useDownloader()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const cachedUrl = ref<string>('')


/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

onMounted(onDownload)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onDownload() {
  try {
    cachedUrl.value = await downloader.download(props.url)
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