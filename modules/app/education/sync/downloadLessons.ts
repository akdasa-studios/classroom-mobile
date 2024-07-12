import { Database } from '@classroom/app/education'
import { lessonsFixtures } from '@classroom/app/shared/fixtures'

export async function downloadLessons() {
  // const myCourses = enrollments.items.map(x => new UuidIdentity(x.course.id))
  // const lessons = await Repositories.Remote.Lessons.find(OfCourses(myCourses))
  // lessons.entities.forEach(x => Repositories.Cache.Lessons.save(x))
  lessonsFixtures.forEach(x => Database.Lessons.save(x))
}