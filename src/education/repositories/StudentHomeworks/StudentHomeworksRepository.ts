import { AssessmentMethod, StudentHomework, StudentHomeworkStatus } from '@/education'
import { PouchRepository, RestRepository, DbScheme, CouchCacheDb } from '@/shared'
import { studentHomeworks } from '@/shared/fixtures'
import { UuidIdentity } from '@framework/domain'


/* -------------------------------------------------------------------------- */
/*                               Database Models                              */
/* -------------------------------------------------------------------------- */

export interface StudentHomeworkDbScheme
  extends DbScheme<'studentHomework'>
{
  userId: string
  lessonSectionId: string
  status: string
  text: string
  work: any,
  assessmentMethod: string
}


/* -------------------------------------------------------------------------- */
/*                                 Serializers                                */
/* -------------------------------------------------------------------------- */

const StudentHomeworkSerializer = (
  from: StudentHomework
): StudentHomeworkDbScheme => ({
  _id: from.id.value,
  '@type': 'studentHomework',
  userId: from.userId,
  lessonSectionId: from.lessonSectionId.value,
  status: from.status,
  text: from.text,
  work: from.work,
  assessmentMethod: from.assessmentMethod
})

const StudentHomeworkDeserializer = (
  from: StudentHomeworkDbScheme
): StudentHomework => new StudentHomework(
  new UuidIdentity(from._id),
  from.userId,
  new UuidIdentity(from.lessonSectionId),
  from.status as StudentHomeworkStatus,
  from.text,
  from.work,
  from.assessmentMethod as AssessmentMethod
)

function ConflictResolver(
  a: StudentHomeworkDbScheme,
  b: StudentHomeworkDbScheme
) {
  if (b.work === undefined || b.work.length === 0) { b.work = a.work }
  return b
}


/* -------------------------------------------------------------------------- */
/*                                Repositories                                */
/* -------------------------------------------------------------------------- */

export const CacheStudentHomeworksRepository = new PouchRepository<StudentHomework, StudentHomeworkDbScheme>(
  CouchCacheDb, 'studentHomework',
  StudentHomeworkSerializer,
  StudentHomeworkDeserializer,
  ConflictResolver,
)

export const RemoteStudentHomeworksRepository = new RestRepository<StudentHomework>(studentHomeworks)
