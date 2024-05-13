import { Database } from "@/education"
import { lessonSectionFixtures } from "@/shared/fixtures"

export async function downloadLessonSections() {
  // const myLessons = lessons.entities.map(x => x.id)
  // const lessonSections = await Repositories.Remote.LessonSections.find(OfLessons(myLessons))
  // lessonSections.entities.forEach(x => Repositories.Cache.LessonSections.save(x))
  lessonSectionFixtures.forEach(x => Database.LessonSections.save(x))
}
