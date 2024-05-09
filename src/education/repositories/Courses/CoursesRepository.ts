import { Course } from '@/education'
import { PouchRepository, DbScheme, CouchCacheDb } from '@/shared'
import { UuidIdentity } from '@framework/domain'


/* -------------------------------------------------------------------------- */
/*                               Database Models                              */
/* -------------------------------------------------------------------------- */

export interface CourseDbScheme
  extends DbScheme<'course'>
{
  title: string,
  subtitle: string,
  summary: string,
  coverImageUrl: string
}


/* -------------------------------------------------------------------------- */
/*                                 Serializers                                */
/* -------------------------------------------------------------------------- */

const CourseSerializer = (
  from: Course
): CourseDbScheme => ({
  _id: from.id.value,
  '@type': 'course',
  title: from.title,
  subtitle: from.subtitle,
  summary: from.summary,
  coverImageUrl: from.coverImageUrl
})

const CourseDeserializer = (
  from: CourseDbScheme
): Course => new Course(
  new UuidIdentity(from._id),
  from.title,
  from.subtitle,
  from.summary,
  from.coverImageUrl
)


/* -------------------------------------------------------------------------- */
/*                                Repositories                                */
/* -------------------------------------------------------------------------- */

export const CacheCoursesRepository = new PouchRepository<Course, CourseDbScheme>(
  CouchCacheDb, 'course',
  CourseSerializer,
  CourseDeserializer,
)
