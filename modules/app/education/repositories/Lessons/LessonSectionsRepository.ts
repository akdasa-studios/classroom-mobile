import { LessonSection, LessonSectionBlock } from '@classroom/app/education'
import { CouchCacheDb, DbScheme, PouchRepository } from '@classroom/app/shared'

// --- Database Scheme -------------------------------------------------------
export type LessonSectionDbScheme = {
  lessonId: string
  title: string
  blocks: LessonSectionBlock[]
} & DbScheme<'lesson-section'>


// --- Serialization & Deserialization ---------------------------------------
const LessonSectionSerializer = (
  from: LessonSection
): LessonSectionDbScheme => ({
  _id: from.id,
  '@type': 'lesson-section',
  lessonId: from.lessonId,
  title: from.title,
  blocks: from.blocks,
})

const LessonSectionDeserializer = (
  from: LessonSectionDbScheme
): LessonSection => new LessonSection(from._id, {
  lessonId: from.lessonId,
  title: from.title,
  blocks: from.blocks,
})


// --- Repositories ----------------------------------------------------------
export const LessonSectionsRepository = new PouchRepository<LessonSection, LessonSectionDbScheme>(
  CouchCacheDb, 'lesson-section',
  LessonSectionSerializer,
  LessonSectionDeserializer,
)
