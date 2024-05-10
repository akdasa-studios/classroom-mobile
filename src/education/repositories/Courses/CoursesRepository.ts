import { PouchRepositoryLight, CouchCacheDb } from '@/shared'
import { Course } from '@/education'

export const CacheCoursesRepository = new PouchRepositoryLight<Course>(CouchCacheDb, 'course')
