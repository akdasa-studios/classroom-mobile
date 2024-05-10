import { PouchRepositoryLight, CouchCacheDb } from '@/shared'
import { Group } from '@/education'

export const CacheGroupsRepository = new PouchRepositoryLight<Group>(CouchCacheDb, 'group')
