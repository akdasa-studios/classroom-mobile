
import { ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'

import { steps as authSyncSteps } from '@/auth/sync'
import { steps as educationSyncSteps } from '@/education/sync'

export type SyncContext = {
  accessToken: string
  refreshToken: string
  syncBaseUrl: string
}

export const useSync = createSharedComposable(() => {
  const busy = ref(false)
  const completedAt = ref(0)

  async function start() {
    try {
      busy.value = true
      console.group('Sync')
      for(const step of [...authSyncSteps, ...educationSyncSteps]) {
        console.log(step.name)
        await step()
      }
    } finally {
      console.groupEnd()
      busy.value = false
      completedAt.value = Date.now()
    }
  }

  return { start, busy, completedAt }
})
