<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import { onMounted } from 'vue'
import { useSyncTask } from './education'
import { useDownloaderQueue } from './shared'

const syncTask = useSyncTask()
const downloaderQueue = useDownloaderQueue()

onMounted(async () => {
  await syncTask.start()
  await downloaderQueue.downloadAll()
})
</script>
