import { PouchRepositoryLight, CouchCacheDb } from '@/shared'
import { Enrollment } from '@/education'

export const CacheEnrollmentsRepository = new PouchRepositoryLight<Enrollment>(CouchCacheDb, 'enrollment')
