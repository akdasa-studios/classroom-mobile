import { LocalStorageCache, LocalStorageService } from '@/shared'
import { Course } from '@protocol/courses'


export interface CoursesCacheRequest {
  id?: string,
  title?: string
  offset: number,
  count: number
}


export class CoursesCache
  extends LocalStorageCache<
    Course,
    CoursesCacheRequest
  > {

  constructor(
    localStorage: LocalStorageService
  ) {
    super('COURSES', localStorage)
  }

  protected filter(
    items: Course[],
    query: CoursesCacheRequest
  ): Course[] {
    if (query.id) {
      const result = items.find(x => x.id === query.id)
      return result ? [result] : []
    }


    const itme = items.sort  ((a, b) => a.id.localeCompare(b.id))
                .filter((x)    => (query.title && x.title)      ? x.title.includes(query.title) : true)
                .filter((_, i) => i >= query.offset && i < query.offset + query.count)
    console.log('query', query, itme)
    return itme
  }
}
