import { PouchRepositoryLight, CouchCacheDb } from '@/shared'
import { Lesson } from '@/education'

export const CacheLessonsRepository = new PouchRepositoryLight<Lesson>(CouchCacheDb, 'lesson')
