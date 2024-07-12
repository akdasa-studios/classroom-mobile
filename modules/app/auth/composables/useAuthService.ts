import { AuthService } from '@classroom/app/auth'
import { useConfig } from '@classroom/app/shared'

export function useAuthService() {
  const config = useConfig()
  return new AuthService(config.baseUrl.value)
}