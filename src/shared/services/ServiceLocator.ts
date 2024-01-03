import { IService } from './IService'

export class ServiceLocator {
  private readonly _services = new Map<string, IService>()

  constructor() {
    console.log('SELO')
  }

  add(
    key: string,
    service: IService
  ) {
    console.log('add', key, service)
    this._services.set(key, service)
  }

  get<T extends IService>(
    key: string
  ): T {
    const service = this._services.get(key)
    console.log('get', key, service)
    if (!service) { throw new Error(`No ${key} service registered`) }
    return service as T
  }

  async init() {
    const initFuncs = Array.from(this._services.values()).map(x => x.init())
    await Promise.allSettled(initFuncs)
  }
}

export const serviceLocator = new ServiceLocator()
