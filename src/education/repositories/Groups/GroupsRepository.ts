import { Group } from '@/education'
import { CacheRepository, RestRepository } from '@/shared'
import { groupsFixtures } from '@/shared/fixtures'


export const CacheGroupsRepository  = new CacheRepository<Group>()
export const RemoteGroupsRepository = new RestRepository<Group>(groupsFixtures)
