import { Group } from '@/education'
import { PouchRepository, RestRepository, DbScheme, CouchCacheDb } from '@/shared'
import { UuidIdentity } from '@framework/domain'
import { groupsFixtures } from '@/shared/fixtures'


/* -------------------------------------------------------------------------- */
/*                               Database Models                              */
/* -------------------------------------------------------------------------- */

export interface GroupDbScheme
  extends DbScheme<'group'>
{
  courseId: string,
  name: string,
  couratorName: string,
  couratorAvatarUrl: string,
  startsAt: number
}


/* -------------------------------------------------------------------------- */
/*                                 Serializers                                */
/* -------------------------------------------------------------------------- */

const GroupSerializer = (
  from: Group
): GroupDbScheme => ({
  _id: from.id.value,
  '@type': 'group',
  courseId: from.courseId.value,
  name: from.name,
  couratorName: from.couratorName,
  couratorAvatarUrl: from.couratorAvatarUrl,
  startsAt: from.startsAt
})

const GroupDeserializer = (
  from: GroupDbScheme
): Group => new Group(
  new UuidIdentity(from._id),
  new UuidIdentity(from.courseId),
  from.name,
  from.couratorName,
  from.couratorAvatarUrl,
  from.startsAt
)


/* -------------------------------------------------------------------------- */
/*                                Repositories                                */
/* -------------------------------------------------------------------------- */

export const CacheGroupsRepository = new PouchRepository<Group, GroupDbScheme>(
  CouchCacheDb, 'group',
  GroupSerializer,
  GroupDeserializer,
)
export const RemoteGroupsRepository = new RestRepository<Group>(groupsFixtures)
