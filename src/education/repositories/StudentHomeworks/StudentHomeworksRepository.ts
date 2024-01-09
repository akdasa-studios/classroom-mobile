import { StudentHomework } from '@/education'
import { CacheRepository, RestRepository } from '@/shared'
import { studentHomeworks } from '@/shared/fixtures'


export const CacheStudentHomeworksRepository  = new CacheRepository<StudentHomework>()
export const RemoteStudentHomeworksRepository = new RestRepository<StudentHomework>(studentHomeworks)
