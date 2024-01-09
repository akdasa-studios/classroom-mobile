import { Cache, Lesson, OfLesson, OfStudentAndLessonSections, LessonSection, StudentHomework, LessonIdentity } from '@/education'

export class MyLessonViewModel {
  private userId = 'a243727d-57ab-4595-ba17-69f3a0679bf6'

  async getLesson(
    lessonId: LessonIdentity
  ): Promise<Lesson> {
    return await Cache.Lessons.get(lessonId)
  }

  async getLessonSections(
    lessonId: LessonIdentity
  ): Promise<readonly LessonSection[]> {
    const result = await Cache.LessonSections.find(OfLesson(lessonId))
    return result.entities
  }

  async getHomework(
    lessonId: LessonIdentity
  ): Promise<readonly StudentHomework[]> {
    const sections   = await this.getLessonSections(lessonId)
    const sectionIds = sections.map(x => x.id)
    const result     = await Cache.StudentHomeworks.find(
      OfStudentAndLessonSections(this.userId, sectionIds)
    )
    return result.entities
  }
}

export const LessonsDal = new MyLessonViewModel()