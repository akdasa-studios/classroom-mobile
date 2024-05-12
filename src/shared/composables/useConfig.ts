import { createGlobalState } from '@vueuse/core'
import { ref } from 'vue'

export const useConfig = createGlobalState(() => {
  const userId = ref('')
  const token = ref('')
  const email = ref('')

  return { userId, token, email }
})
