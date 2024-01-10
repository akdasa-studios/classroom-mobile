<template>
  {{ cachedUrl }}
  <img
    :src="cachedUrl"
    :class="{'cached' : cached}"
  >
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useDownloader } from '@/shared'

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

const cachedUrl = ref<string>('https://placehold.co/600x400/EEE/31343C')
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