import { Cache } from '@protocol/core'
import { Course } from '@protocol/courses'

export interface GetCoursesCacheQuery {
  id?: string,
  title?: string
  offset?: number,
  count?: number
}

export class CoursesCache
  implements Cache<
    Course,
    GetCoursesCacheQuery
  > {

  async get(query: GetCoursesCacheQuery): Promise<Course[]> {
    const courses: Map<string, Course> = new Map(
      Object.entries(
        JSON.parse(localStorage.getItem('COURSES')||'{}')
      )
    )

    let crs = Array.from(courses.values())
      .sort((a, b) => a.id.localeCompare(b.id))
      .filter(x => x.title.includes(query.title || ''))


    if (query.offset !== undefined && query.count !== undefined) {
      crs = crs.filter((_, idx) =>
        idx >= query.offset &&
        idx <  query.offset + query.count)
    }
    return await crs
  }

  save(models: Course[]): void {
    const courses: Map<string, Course> = new Map(Object.entries(JSON.parse(localStorage.getItem('COURSES')||'{}')))
    models.forEach(model => courses.set(model.id, model))
    localStorage.setItem('COURSES',  JSON.stringify(Object.fromEntries(courses.entries())))
  }

  hash(query: GetCoursesCacheQuery) {
    return `${query.offset}|${query.count}|${query.id}|${query.title}`
  }

  invalidate(): void {
      localStorage.clear()
  }
}