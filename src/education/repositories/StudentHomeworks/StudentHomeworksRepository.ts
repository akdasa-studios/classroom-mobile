import { PouchRepositoryLight, CouchCacheDb } from '@/shared'
import { StudentHomework } from '@/education'

export const CacheStudentHomeworksRepository = new PouchRepositoryLight<StudentHomework>(CouchCacheDb, 'student-homework')
