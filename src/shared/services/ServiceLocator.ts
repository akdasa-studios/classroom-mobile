
export class ServiceLocator {
  private readonly _services = new Map<string, any>()

  add(
    key: string,
    service: any
  ) {
    console.log('add', key, service)
    this._services.set(key, service)
  }

  get<T>(
    key: string
  ): T {
    const service = this._services.get(key)
    console.log('get', key, service)
    if (!service) { throw new Error(`No ${key} service registered`) }
    return service as T
  }

  async init() {
    const initFuncs = Array.from(this._services.values()).map(x => x.init ? x.init() : () => {})
    await Promise.allSettled(initFuncs)
  }
}

export const serviceLocator = new ServiceLocator()
