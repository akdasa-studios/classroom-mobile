import { Lesson, OfLesson, OfStudentAndLessonSections, LessonSection, StudentHomework, LessonIdentity } from '@/education'
import { useRepository } from '@/shared'
import { lessonSectionFixtures, lessonsFixtures, studentHomeworks } from '@/shared/fixtures'

export class MyLessonViewModel {
  private userId = 'a243727d-57ab-4595-ba17-69f3a0679bf6'

  private readonly lessonsRepo          = useRepository<Lesson>('lesson', lessonsFixtures)
  private readonly lessonSectionsRepo   = useRepository<LessonSection>('lesson-section', lessonSectionFixtures)
  private readonly studentHomeworksRepo = useRepository<StudentHomework>('student-homework', studentHomeworks)

  async getLesson(
    lessonId: LessonIdentity
  ): Promise<Lesson> {
    return await this.lessonsRepo.get(lessonId)
  }

  async getLessonSections(
    lessonId: LessonIdentity
  ): Promise<readonly LessonSection[]> {
    const result = await this.lessonSectionsRepo.find(OfLesson(lessonId))
    return result.entities
  }

  async getHomework(
    lessonId: LessonIdentity
  ): Promise<readonly StudentHomework[]> {
    const sections   = await this.getLessonSections(lessonId)
    const sectionIds = sections.map(x => x.id)
    const result     = await this.studentHomeworksRepo.find(
      OfStudentAndLessonSections(this.userId, sectionIds)
    )
    return result.entities
  }
}

export const LessonsDal = new MyLessonViewModel()