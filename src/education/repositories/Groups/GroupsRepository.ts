import { Group } from '@/education'
import { PouchRepository, RestRepository, ObjectMapper, DbScheme, CouchCacheDb } from '@/shared'
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

class GroupSerializer
  implements ObjectMapper<
    Group,
    GroupDbScheme
  >
{
  map(
    from: Group
  ): GroupDbScheme {
    return {
      _id: from.id.value,
      '@type': 'group',
      courseId: from.courseId.value,
      name: from.name,
      couratorName: from.couratorName,
      couratorAvatarUrl: from.couratorAvatarUrl,
      startsAt: from.startsAt
    }
  }
}

class GroupDeserializer
  implements ObjectMapper<
    GroupDbScheme,
    Group
  >
{
  map(
    from: GroupDbScheme
  ): Group {
    return new Group(
      new UuidIdentity(from._id),
      new UuidIdentity(from.courseId),
      from.name,
      from.couratorName,
      from.couratorAvatarUrl,
      from.startsAt
    )
  }
}


/* -------------------------------------------------------------------------- */
/*                                Repositories                                */
/* -------------------------------------------------------------------------- */

export const CacheGroupsRepository = new PouchRepository<Group>(
  CouchCacheDb, 'group',
  new GroupSerializer(),
  new GroupDeserializer(),
)
export const RemoteGroupsRepository = new RestRepository<Group>(groupsFixtures)
