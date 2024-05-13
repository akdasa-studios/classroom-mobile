import { watch, Ref } from 'vue'
import { Storage } from '@ionic/storage'
import { useConfig } from '@/shared'

export async function runConfigPersistence() {
  // --- Dependencies -----------------------------------
  const config = useConfig()

  // --- Initialization ---------------------------------
  const storage = new Storage({ name: 'config' })
  await storage.create()

  // Bind config to storage
  await bind(config.accessToken,   'auth.token.access', '')
  await bind(config.refreshToken,  'auth.token.refresh', '')
  await bind(config.userId, 'auth.user.id', '')
  await bind(config.email,  'auth.user.email', '')

  // --- Helpers ----------------------------------------
  async function bind<T>(config: Ref<T>, key: string, defaultValue: T) {
    config.value = await storage.get(key) || defaultValue
    watch(config, async (value) => { await storage.set(key, value) })
    console.log(`Bound ${key} to storage: ${config.value}`)
  }
}
