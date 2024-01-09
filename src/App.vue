<template>
  <ion-app>
    <ion-router-outlet />
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue'
import { onMounted } from 'vue'
import { useSyncTask } from './education'

const syncTask = useSyncTask()

onMounted(() => syncTask.start())
</script>
