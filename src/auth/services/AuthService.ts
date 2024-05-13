import { AuthRequest, AuthResponse, RefreshTokenRequest, RefreshTokenResponse } from "@protocol/AuthService"

export class AuthService {
  constructor(private readonly baseUrl: string) {}

  async signIn(
    request: AuthRequest
  ): Promise<AuthResponse> {
    const url = `${this.baseUrl}/auth/email`

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      })

      if (response.ok) {
        return await response.json()
      } else {
        throw new Error('Request failed:' + response.status)
      }
    } catch (error) {
      throw new Error('Network error:' + error)
    }
  }

  async refreshToken(
    request: RefreshTokenRequest
  ): Promise<RefreshTokenResponse> {
    const url = `${this.baseUrl}/auth/refresh`

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      })

      if (response.ok) {
        return await response.json()
      } else {
        throw new Error('Request failed:' + response.status)
      }
    } catch (error) {
      throw new Error('Network error:' + error)
    }
  }
}

