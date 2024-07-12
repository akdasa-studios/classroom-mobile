import { Group } from '@classroom/app/education'
import { CouchCacheDb, DbScheme, PouchRepository } from '@classroom/app/shared'

// --- Database Scheme -------------------------------------------------------
export type GroupDbScheme = {
  name: string
  courseId: string
  couratorName: string
  couratorAvatarUrl: string
  startsAt: number
} & DbScheme<'group'>


// --- Serialization & Deserialization ---------------------------------------
const GroupSerializer = (
  from: Group
): GroupDbScheme => ({
  _id: from.id,
  '@type': 'group',
  name: from.name,
  courseId: from.courseId,
  couratorName: from.couratorName,
  couratorAvatarUrl: from.couratorAvatarUrl,
  startsAt: from.startsAt.getTime(),
})

const GroupDeserializer = (
  from: GroupDbScheme
): Group => new Group(from._id, {
  name: from.name,
  courseId: from.courseId,
  couratorName: from.couratorName,
  couratorAvatarUrl: from.couratorAvatarUrl,
  startsAt: new Date(from.startsAt),
})


// --- Repositories ----------------------------------------------------------
export const GroupsRepository = new PouchRepository<Group, GroupDbScheme>(
  CouchCacheDb, 'group',
  GroupSerializer,
  GroupDeserializer,
)
