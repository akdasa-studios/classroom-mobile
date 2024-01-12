import { Enrollment, EnrollmentStatus } from '@/education'
import { PouchRepository, RestRepository, ObjectMapper, DbScheme, CouchCacheDb } from '@/shared'
import { EnrollmentsFixtures } from '@/shared/fixtures'
import { UuidIdentity } from '@framework/domain'


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

class EnrollmentSerializer
  implements ObjectMapper<
    Enrollment,
    EnrollmentDbScheme
  >
{
  map(
    from: Enrollment
  ): EnrollmentDbScheme {
    return {
      _id: from.id.value,
      '@type': 'enrollment',
      userId: from.userId,
      groupId: from.groupId?.value,
      courseId: from.courseId.value,
      status: from.status
    }
  }
}

class EnrollmentDeserializer
  implements ObjectMapper<
    EnrollmentDbScheme,
    Enrollment
  >
{
  map(
    from: EnrollmentDbScheme
  ): Enrollment {
    return new Enrollment(
      new UuidIdentity(from._id),
      from.userId,
      from.groupId ? new UuidIdentity(from.groupId) : undefined,
      new UuidIdentity(from.courseId),
      from.status as EnrollmentStatus
    )
  }
}


/* -------------------------------------------------------------------------- */
/*                                Repositories                                */
/* -------------------------------------------------------------------------- */

export const CacheEnrollmentsRepository = new PouchRepository<Enrollment>(
  CouchCacheDb, 'enrollment',
  new EnrollmentSerializer(),
  new EnrollmentDeserializer(),
)

export const RemoteEnrollmentsRepository = new RestRepository<Enrollment>(EnrollmentsFixtures)
