import { StudentHomework, LessonSection, Lesson } from '@/education'

export interface HomeworkViewModel {
  studentHomework: StudentHomework,
  lesson: Lesson,
  lessonSection: LessonSection
}