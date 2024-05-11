import { AuthRequest, AuthResponse } from "@protocol/AuthService"

export class AuthService {
  async signIn(
    request: AuthRequest
  ): Promise<AuthResponse> {
    const url = 'http://localhost:3000/auth/email'

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
