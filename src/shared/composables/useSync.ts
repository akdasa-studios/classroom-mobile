
import { ref } from 'vue'
import { createSharedComposable } from '@vueuse/core'
import { steps } from '@/education/sync'
import { useConfig } from '@/shared'


export const useSync = createSharedComposable(() => {
  const busy = ref(false)
  const config = useConfig()
  const completedAt = ref(0)

  async function start() {
    try {
      busy.value = true
      for(const step of steps) {
        await step(config.userId.value, config.token.value)
      }
    } finally {
      busy.value = false
      completedAt.value = Date.now()
    }
  }

  return { start, busy, completedAt }
})
