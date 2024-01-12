import { Course } from '@/education'
import { PouchRepository, RestRepository, ObjectMapper, DbScheme, CouchCacheDb } from '@/shared'
import { courses } from '@/shared/fixtures'
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

class CourseSerializer
  implements ObjectMapper<
    Course,
    CourseDbScheme
  >
{
  map(
    from: Course
  ): CourseDbScheme {
    return {
      _id: from.id.value,
      '@type': 'course',
      title: from.title,
      subtitle: from.subtitle,
      summary: from.summary,
      coverImageUrl: from.coverImageUrl
    }
  }
}

class CourseDeserializer
  implements ObjectMapper<
    CourseDbScheme,
    Course
  >
{
  map(
    from: CourseDbScheme
  ): Course {
    return new Course(
      new UuidIdentity(from._id),
      from.title,
      from.subtitle,
      from.summary,
      from.coverImageUrl
    )
  }
}


/* -------------------------------------------------------------------------- */
/*                                Repositories                                */
/* -------------------------------------------------------------------------- */

export const CacheCoursesRepository = new PouchRepository<Course>(
  CouchCacheDb, 'course',
  new CourseSerializer(),
  new CourseDeserializer(),
)

export const RemoteCoursesRepository = new RestRepository<Course>(courses)
