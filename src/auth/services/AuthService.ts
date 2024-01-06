export class AuthService {
  async getSignInCode(email: string) {
    const url = 'https://bcs-sod.free.beeceptor.com/auth/email'
    const data = { email }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        // Handle successful response
        const result = await response.json()
        console.log(result)
      } else {
        // Handle error response
        console.error('Request failed:', response.status)
      }
    } catch (error) {
      // Handle network error
      console.error('Network error:', error)
    }
  }

  async signInWithCode(code: string) {
    const url = 'https://bcs-sod.free.beeceptor.com/auth/email'
    const data = { code }

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        // Handle successful response
        const result = await response.json()
        return result
      } else {
        // Handle error response
        console.error('Request failed:', response.status)
      }
    } catch (error) {
      // Handle network error
      console.error('Network error:', error)
    }
  }
}
