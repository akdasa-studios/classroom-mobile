import { ref } from 'vue'
import { SyncWithRemoteServer, UploadToRemoteServer } from '../tasks/SyncTask'
import { createSharedComposable } from '@vueuse/core'
import { useConfig } from '@/shared'

export const useSyncTask = createSharedComposable(() => {
  const busy         = ref(false)
  const completedAt  = ref(0)
  const direction    = ref<'upload'|'download'>('upload')

  async function start() {
    const config = useConfig()

    busy.value = true
    direction.value = 'upload'
    await UploadToRemoteServer(config.userId.value, config.token.value)
    direction.value = 'download'
    await SyncWithRemoteServer(config.userId.value, config.token.value)
    busy.value = false
    completedAt.value = Date.now()
  }

  return { start, busy, completedAt, direction }
})
