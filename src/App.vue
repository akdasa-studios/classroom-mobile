<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import { onMounted, watch } from 'vue'
import { useSyncTask } from '@/education'
import { useConfig, useDownloaderQueue } from '@/shared'

const syncTask = useSyncTask()
const downloaderQueue = useDownloaderQueue()
const config = useConfig()

watch(config.token, async (token) => {
  if (token) {
    await syncTask.start()
    await downloaderQueue.downloadAll()
  }
})

onMounted(async () => {
  await syncTask.start()
  await downloaderQueue.downloadAll()
})
</script>
