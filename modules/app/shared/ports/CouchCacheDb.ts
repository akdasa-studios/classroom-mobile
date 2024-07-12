import { Capacitor } from '@capacitor/core'
import { CouchDB } from './PouchDb/CouchDb'

export const CouchCacheDb = new CouchDB('cache', {
  adapter: Capacitor.getPlatform() !== 'web' ? 'cordova-sqlite' : undefined,
})