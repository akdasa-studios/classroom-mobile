<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import { onMounted, watch } from 'vue'
import { useConfig, useDownloaderQueue, useSync } from '@classroom/app/shared'

const sync = useSync()
const downloaderQueue = useDownloaderQueue()
const config = useConfig()

// TODO; Move to runSyncOnAuth
// watch(config.accessToken, async (token) => {
//   await sync.start()
//   await downloaderQueue.downloadAll()
// })

onMounted(async () => {
  await sync.start()
  await downloaderQueue.downloadAll()
})
</script>
