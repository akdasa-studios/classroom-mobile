import { PouchRepositoryLight, CouchCacheDb } from '@/shared'
import { LessonSection } from '@/education'

export const CacheLessonSectionsRepository = new PouchRepositoryLight<LessonSection>(CouchCacheDb, 'lesson-section')
