import { Lesson } from '@/education'
import { CouchCacheDb, DbScheme, PouchRepository } from '@/shared'

// --- Database Scheme -------------------------------------------------------
export type LessonDbScheme = {
  courseId: string
  title: string
  summary: string
} & DbScheme<'lesson'>


// --- Serialization & Deserialization ---------------------------------------
const LessonSerializer = (
  from: Lesson
): LessonDbScheme => ({
  _id: from.id,
  '@type': 'lesson',
  courseId: from.courseId,
  title: from.title,
  summary: from.summary,
})

const LessonDeserializer = (
  from: LessonDbScheme
): Lesson => new Lesson(from._id, {
  courseId: from.courseId,
  title: from.title,
  summary: from.summary,
})


// --- Repositories ----------------------------------------------------------
export const LessonsRepository = new PouchRepository<Lesson, LessonDbScheme>(
  CouchCacheDb, 'lesson',
  LessonSerializer,
  LessonDeserializer,
)
