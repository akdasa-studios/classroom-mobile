import { StudentHomework, LessonSection, Lesson } from '@classroom/app/education'

export interface HomeworkViewModel {
  studentHomework: StudentHomework,
  lesson: Lesson,
  lessonSection: LessonSection
}