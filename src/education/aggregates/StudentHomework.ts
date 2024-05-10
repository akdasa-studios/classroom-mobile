import { LessonSectionBlockState } from './LessonSectionBlock'


export type AssessmentMethod = 'not-required' | 'auto' | 'teacher'

export type StudentHomeworkStatus = 'open' | 'pending' | 'in-review' | 'returned' | 'accepted'

export type StudentHomework = {
  _id: string,
  userId: string,
  lessonSectionId: string,
  status: StudentHomeworkStatus,
  text: string,
  work?: LessonSectionBlockState[],
  assessmentMethod: AssessmentMethod
}
