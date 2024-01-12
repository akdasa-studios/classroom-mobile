import { Lesson } from '@/education'
import { PouchRepository, RestRepository, ObjectMapper, DbScheme, CouchCacheDb } from '@/shared'
import { lessonsFixtures } from '@/shared/fixtures'
import { UuidIdentity } from '@framework/domain'


/* -------------------------------------------------------------------------- */
/*                               Database Models                              */
/* -------------------------------------------------------------------------- */

export interface LessonDbScheme
  extends DbScheme<'lesson'>
{
  courseId: string,
  title: string,
  summary: string,
}


/* -------------------------------------------------------------------------- */
/*                                 Serializers                                */
/* -------------------------------------------------------------------------- */

class LessonSerializer
  implements ObjectMapper<
    Lesson,
    LessonDbScheme
  >
{
  map(
    from: Lesson
  ): LessonDbScheme {
    return {
      _id: from.id.value,
      '@type': 'lesson',
      title: from.title,
      summary: from.summary,
      courseId: from.courseId.value
    }
  }
}

class LessonDeserializer
  implements ObjectMapper<
    LessonDbScheme,
    Lesson
  >
{
  map(
    from: LessonDbScheme
  ): Lesson {
    return new Lesson(
      new UuidIdentity(from._id),
      new UuidIdentity(from.courseId),
      from.title,
      from.summary,
    )
  }
}


/* -------------------------------------------------------------------------- */
/*                                Repositories                                */
/* -------------------------------------------------------------------------- */

export const CacheLessonsRepository = new PouchRepository<Lesson>(
  CouchCacheDb, 'lesson',
  new LessonSerializer(),
  new LessonDeserializer(),
)

export const RemoteLessonsRepository = new RestRepository<Lesson>(lessonsFixtures)
