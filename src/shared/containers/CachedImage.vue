<template>
  {{ cachedUrl }}
  <img
    v-if="!downloader.isDownloading.value"
    :src="cachedUrl"
    :class="{'cached' : cached}"
  >
  <ion-skeleton-text
    v-else
    :animated="true"
    class="img"
  />
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

const cachedUrl = ref<string|undefined>(undefined)
const cached = ref(false)


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
    cached.value = true
  } catch (err) {
    cachedUrl.value = props.url
    alert(err)
  }
}
</script>


<style scoped>
.img {
  height: 128px;
}
.cached {
  border: 1px green solid;
}
</style>