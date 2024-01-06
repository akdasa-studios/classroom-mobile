import { AuthService } from '@/auth'

export function useAuthService() {
  return new AuthService()
}