import { AccountService } from '@/auth'

export function useAccountService() {
  return new AccountService()
}
