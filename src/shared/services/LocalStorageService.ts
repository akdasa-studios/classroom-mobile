import { Storage } from '@ionic/storage'
import { IService } from './IService'


export class LocalStorageService
  implements IService
{
  private storage: Storage

  constructor() {
    this.storage = new Storage()
  }

  async init() {
    await this.storage.create()
  }

  async set(
    key: string,
    value: any
  ) {
    await this.storage.set(key, value)
  }

  async get(
    key: string
  ) {
    return this.storage.get(key)
  }
}