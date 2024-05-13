import { useAuthService } from "@/auth"
import { useConfig } from "@/shared"

export async function downloadAccessToken() {
  const authService = useAuthService()
  const config = useConfig()

  const response = await authService.refreshToken({
    refreshToken: config.refreshToken.value
  })

  config.accessToken.value = response.accessToken
  config.refreshToken.value = response.refreshToken
}
