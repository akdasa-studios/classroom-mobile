import { Lesson } from '@/education'
import { PouchRepository, RestRepository, DbScheme, CouchCacheDb } from '@/shared'
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

const LessonSerializer = (
  from: Lesson
): LessonDbScheme => ({
  _id: from.id.value,
  '@type': 'lesson',
  title: from.title,
  summary: from.summary,
  courseId: from.courseId.value
})


const LessonDeserializer = (
  from: LessonDbScheme
): Lesson => new Lesson(
  new UuidIdentity(from._id),
  new UuidIdentity(from.courseId),
  from.title,
  from.summary,
)


/* -------------------------------------------------------------------------- */
/*                                Repositories                                */
/* -------------------------------------------------------------------------- */

export const CacheLessonsRepository = new PouchRepository<Lesson, LessonDbScheme>(
  CouchCacheDb, 'lesson',
  LessonSerializer,
  LessonDeserializer,
)

export const RemoteLessonsRepository = new RestRepository<Lesson>(lessonsFixtures)
