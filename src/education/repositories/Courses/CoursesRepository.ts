import { Course } from '@/education'
import { CacheRepository, RestRepository } from '@/shared'
import { courses } from '@/shared/fixtures'


export const CacheCoursesRepository  = new CacheRepository<Course>()
export const RemoteCoursesRepository = new RestRepository<Course>(courses)