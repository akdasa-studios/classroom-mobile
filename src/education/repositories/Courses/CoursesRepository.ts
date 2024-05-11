import { Course } from '@/education'
import { CouchCacheDb, DbScheme, PouchRepository } from '@/shared'

// --- Database Scheme -------------------------------------------------------
export type CourseDbScheme = {
  title: string,
  subtitle: string,
  summary: string,
  coverImageUrl: string
} & DbScheme<'course'>


// --- Serialization & Deserialization ---------------------------------------
const CourseSerializer = (
  from: Course
): CourseDbScheme => ({
  _id: from.id,
  '@type': 'course',
  subtitle: from.subtitle,
  title: from.title,
  summary: from.summary,
  coverImageUrl: from.coverImageUrl,
})

const CourseDeserializer = (
  from: CourseDbScheme
): Course => new Course(from._id, {
  title: from.title,
  subtitle: from.subtitle,
  summary: from.summary,
  coverImageUrl: from.coverImageUrl,
})


// --- Repositories ----------------------------------------------------------
export const CoursesRepository = new PouchRepository<Course, CourseDbScheme>(
  CouchCacheDb, 'course',
  CourseSerializer,
  CourseDeserializer,
)
