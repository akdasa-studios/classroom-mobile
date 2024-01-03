import { EntitiesCache, IEntitiesCacheRequest, LocalStorageService } from '@/shared'
import { Course } from '@protocol/courses'


export interface CoursesCacheRequest
  extends IEntitiesCacheRequest {
  id?: string,
  title?: string
  offset?: number,
  count?: number
}

export class CoursesCache
  extends EntitiesCache<
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
    return items.sort((a, b) => a.id.localeCompare(b.id))
                .filter(x => x.title.includes(query.title || ''))
  }
}