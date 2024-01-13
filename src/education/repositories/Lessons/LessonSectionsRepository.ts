import { LessonSection } from '@/education'
import { PouchRepository, RestRepository, DbScheme, CouchCacheDb } from '@/shared'
import { lessonSectionFixtures } from '@/shared/fixtures'
import { UuidIdentity } from '@framework/domain'


/* -------------------------------------------------------------------------- */
/*                               Database Models                              */
/* -------------------------------------------------------------------------- */

export interface LessonSectionDbScheme
  extends DbScheme<'lessonSection'>
{
  lessonId: string,
  title: string,
  blocks: any
}


/* -------------------------------------------------------------------------- */
/*                                 Serializers                                */
/* -------------------------------------------------------------------------- */

const LessonSectionSerializer = (
  from: LessonSection
): LessonSectionDbScheme => ({
  _id: from.id.value,
  '@type': 'lessonSection',
  lessonId: from.lessonId.value,
  title: from.title,
  blocks: from.blocks
})

const LessonSectionDeserializer = (
  from: LessonSectionDbScheme
): LessonSection => new LessonSection(
  new UuidIdentity(from._id),
  new UuidIdentity(from.lessonId),
  from.title,
  from.blocks
)


/* -------------------------------------------------------------------------- */
/*                                Repositories                                */
/* -------------------------------------------------------------------------- */

export const CacheLessonSectionsRepository = new PouchRepository<LessonSection, LessonSectionDbScheme>(
  CouchCacheDb, 'lessonSection',
  LessonSectionSerializer,
  LessonSectionDeserializer,
)

export const RemoteLessonSectionssRepository = new RestRepository<LessonSection>(lessonSectionFixtures)