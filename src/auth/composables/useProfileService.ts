import { ProfileService } from '@/auth'
import { createSharedComposable } from '@vueuse/core'

export const useProfileService = createSharedComposable(() => {
  return new ProfileService("NO TOKEN")
})
