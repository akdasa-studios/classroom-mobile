import { Enrollment } from '@/education'
import { CacheRepository, RestRepository } from '@/shared'
import { EnrollmentsFixtures } from '@/shared/fixtures'


export const CacheEnrollmentsRepository  = new CacheRepository<Enrollment>()
export const RemoteEnrollmentsRepository = new RestRepository<Enrollment>(EnrollmentsFixtures)