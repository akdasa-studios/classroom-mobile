export abstract class RemoteService {
  protected async get<TResponse>(
    url: string,
    queryParams: { [key: string]: string } | undefined = undefined
  ) {
    const finalUrl = queryParams
      ? url + "?" + new URLSearchParams(queryParams)
      : url

    const response = await fetch(finalUrl, {
      headers: { 'accept': 'application/json' }
    })
    if (response.ok) {
      return await response.json() as TResponse
    } else {
      throw Error('Failed to fetch data')
    }
  }

  protected async post<TRequest, TResponse>(url: string, payload: TRequest) {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    if (response.ok) {
      return await response.json() as TResponse
    } else {
      throw Error('Failed to fetch data')
    }
  }

  protected async patch<TRequest, TResponse>(url: string, payload: TRequest) {
    const response = await fetch(url, {
      method: 'PATCH',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body: JSON.stringify(payload)
    })
    if (response.ok) {
      return await response.json() as TResponse
    } else {
      throw Error('Failed to fetch data')
    }
  }
}
