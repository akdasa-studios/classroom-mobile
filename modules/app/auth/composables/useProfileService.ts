import { ProfileService } from '@classroom/app/auth'
import { useConfig } from '@classroom/app/shared'
import { createSharedComposable } from '@vueuse/core'

export const useProfileService = createSharedComposable(() => {
  const config = useConfig()
  return new ProfileService(config.baseUrl.value, config.accessToken.value)
})
