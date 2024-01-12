import { LessonSection } from '@/education'
import { PouchRepository, RestRepository, ObjectMapper, DbScheme, CouchCacheDb } from '@/shared'
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

class LessonSectionSerializer
  implements ObjectMapper<
    LessonSection,
    LessonSectionDbScheme
  >
{
  map(
    from: LessonSection
  ): LessonSectionDbScheme {
    return {
      _id: from.id.value,
      '@type': 'lessonSection',
      lessonId: from.lessonId.value,
      title: from.title,
      blocks: from.blocks
    }
  }
}

class LessonSectionDeserializer
  implements ObjectMapper<
    LessonSectionDbScheme,
    LessonSection
  >
{
  map(
    from: LessonSectionDbScheme
  ): LessonSection {
    return new LessonSection(
      new UuidIdentity(from._id),
      new UuidIdentity(from.lessonId),
      from.title,
      from.blocks
    )
  }
}


/* -------------------------------------------------------------------------- */
/*                                Repositories                                */
/* -------------------------------------------------------------------------- */

export const CacheLessonSectionsRepository = new PouchRepository<LessonSection>(
  CouchCacheDb, 'lessonSection',
  new LessonSectionSerializer(),
  new LessonSectionDeserializer(),
)

export const RemoteLessonSectionssRepository = new RestRepository<LessonSection>(lessonSectionFixtures)