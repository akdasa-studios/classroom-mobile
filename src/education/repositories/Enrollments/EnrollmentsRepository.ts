import { Enrollment, EnrollmentStatus } from '@/education'
import { CouchCacheDb, DbScheme, PouchRepository } from '@/shared'

// --- Database Scheme -------------------------------------------------------
export type EnrollmentDbScheme = {
  groupId?: string,
  courseId: string,
  status: EnrollmentStatus,
  declinedBy?: string,
} & DbScheme<'enrollment'>


// --- Serialization & Deserialization ---------------------------------------
const EnrollmentSerializer = (
  from: Enrollment
): EnrollmentDbScheme => ({
  _id: from.id,
  '@type': 'enrollment',
  groupId: from.groupId,
  courseId: from.courseId,
  status: from.status,
  declinedBy: from.declinedBy,
})

const EnrollmentDeserializer = (
  from: EnrollmentDbScheme
): Enrollment => new Enrollment(from._id, {
  groupId: from.groupId,
  courseId: from.courseId,
  status: from.status,
  declinedBy: from.declinedBy,
})


// --- Repositories ----------------------------------------------------------
export const EnrollmentsRepository = new PouchRepository<Enrollment, EnrollmentDbScheme>(
  CouchCacheDb, 'enrollment',
  EnrollmentSerializer,
  EnrollmentDeserializer,
)
