import { GetProfileResponse, UpdateProfileRequest, UpdateProfileResponse } from '@classroom/protocol/ProfileService'

export class ProfileService {
  constructor(private readonly baseUrl: string, private token: string = '') {}

  public setToken(token: string) {
    this.token = token
  }

  public async get(): Promise<GetProfileResponse> {
    const url = `${this.baseUrl}/profile`

    try {
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`,
        },
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

  public async update(
    request: UpdateProfileRequest
  ): Promise<UpdateProfileResponse> {
    const url = `${this.baseUrl}/profile`

    try {
      const response = await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.token}`,
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
