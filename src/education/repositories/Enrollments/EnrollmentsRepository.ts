import { Enrollment } from '@/education'
import { PouchRepository, RestRepository, DbScheme, CouchCacheDb } from '@/shared'
import { EnrollmentsFixtures } from '@/shared/fixtures'
import { UuidIdentity } from '@framework/domain'
import { EnrollmentStatus } from '@core/aggregates'

/* -------------------------------------------------------------------------- */
/*                               Database Models                              */
/* -------------------------------------------------------------------------- */

export interface EnrollmentDbScheme
  extends DbScheme<'enrollment'>
{
  userId: string,
  groupId?: string,
  courseId: string,
  status: string
}


/* -------------------------------------------------------------------------- */
/*                                 Serializers                                */
/* -------------------------------------------------------------------------- */

const EnrollmentSerializer = (
  from: Enrollment
): EnrollmentDbScheme => ({
  _id: from.id.value,
  '@type': 'enrollment',
  userId: from.userId,
  groupId: from.groupId?.value,
  courseId: from.courseId.value,
  status: from.status
})

const EnrollmentDeserializer = (
  from: EnrollmentDbScheme
): Enrollment => new Enrollment(
  new UuidIdentity(from._id),
  from.userId,
  from.groupId ? new UuidIdentity(from.groupId) : undefined,
  new UuidIdentity(from.courseId),
  from.status as EnrollmentStatus
)


/* -------------------------------------------------------------------------- */
/*                                Repositories                                */
/* -------------------------------------------------------------------------- */

export const CacheEnrollmentsRepository = new PouchRepository<Enrollment, EnrollmentDbScheme>(
  CouchCacheDb, 'enrollment',
  EnrollmentSerializer,
  EnrollmentDeserializer,
)

export const RemoteEnrollmentsRepository = new RestRepository<Enrollment>(EnrollmentsFixtures)
