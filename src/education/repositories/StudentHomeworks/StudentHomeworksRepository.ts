import { StudentHomework, StudentHomeworkState } from '@/education'
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
  state: string
  text: string
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
      state: from.state,
      text: from.text
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
      from.state as StudentHomeworkState,
      from.text
    )
  }
}


/* -------------------------------------------------------------------------- */
/*                                Repositories                                */
/* -------------------------------------------------------------------------- */

export const CacheStudentHomeworksRepository = new PouchRepository<StudentHomework>(
  CouchCacheDb, 'studentHomework',
  new StudentHomeworkSerializer(),
  new StudentHomeworkDeserializer(),
)

export const RemoteStudentHomeworksRepository = new RestRepository<StudentHomework>(studentHomeworks)
