import { Storage } from '@ionic/storage'
import { createGlobalState } from '@vueuse/core'
import { ref, watch } from 'vue'

export const useConfig = createGlobalState(() => {
  const userId = ref('')
  const token = ref('')
  const email = ref('')

  return { userId, token, email }
})

export const useConfigPersistence = createGlobalState(async () => {
  const storage = new Storage({ name: 'config' })
  await storage.create()
  const config = useConfig()

  config.token.value  = await storage.get('token')  || ''
  config.userId.value = await storage.get('userId') || ''
  config.email.value  = await storage.get('email')  || ''

  watch(config.userId, async (value) => {
    await storage.set('userId', value)
  })
  watch(config.token, async (value) => {
    await storage.set('token', value)
  })
  watch(config.email, async (value) => {
    await storage.set('email', value)
  })
})
