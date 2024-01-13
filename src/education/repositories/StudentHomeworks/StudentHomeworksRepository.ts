import { StudentHomework, StudentHomeworkStatus } from '@/education'
import { PouchRepository, RestRepository, ObjectMapper, DbScheme, CouchCacheDb } from '@/shared'
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
  work: any
}


/* -------------------------------------------------------------------------- */
/*                                 Serializers                                */
/* -------------------------------------------------------------------------- */

class StudentHomeworkSerializer
  implements ObjectMapper<
    StudentHomework,
    StudentHomeworkDbScheme
  >
{
  map(
    from: StudentHomework
  ): StudentHomeworkDbScheme {
    return {
      _id: from.id.value,
      '@type': 'studentHomework',
      userId: from.userId,
      lessonSectionId: from.lessonSectionId.value,
      status: from.status,
      text: from.text,
      work: from.work
    }
  }
}

class StudentHomeworkDeserializer
  implements ObjectMapper<
    StudentHomeworkDbScheme,
    StudentHomework
  >
{
  map(
    from: StudentHomeworkDbScheme
  ): StudentHomework {
    return new StudentHomework(
      new UuidIdentity(from._id),
      from.userId,
      new UuidIdentity(from.lessonSectionId),
      from.status as StudentHomeworkStatus,
      from.text,
      from.work
    )
  }
}

function ConflictResolver(
  a: StudentHomeworkDbScheme,
  b: StudentHomeworkDbScheme
) {
  if (!b.work) { b.work = a.work }
  return b
}


/* -------------------------------------------------------------------------- */
/*                                Repositories                                */
/* -------------------------------------------------------------------------- */

export const CacheStudentHomeworksRepository = new PouchRepository<StudentHomework>(
  CouchCacheDb, 'studentHomework',
  new StudentHomeworkSerializer(),
  new StudentHomeworkDeserializer(),
  ConflictResolver,
)

export const RemoteStudentHomeworksRepository = new RestRepository<StudentHomework>(studentHomeworks)
