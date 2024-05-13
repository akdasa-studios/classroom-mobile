import { ProfileService } from '@/auth'
import { useConfig } from '@/shared'
import { createSharedComposable } from '@vueuse/core'

export const useProfileService = createSharedComposable(() => {
  const config = useConfig()
  return new ProfileService(config.baseUrl.value, config.accessToken.value)
})
