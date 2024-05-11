import { Aggregate } from '@/shared'
import { LessonSectionBlockState } from './LessonSectionBlock'


export type AssessmentMethod = 'not-required' | 'auto' | 'teacher'

export type StudentHomeworkStatus = 'open' | 'pending' | 'in-review' | 'returned' | 'accepted'

export type StudentHomeworkProps = {
  userId: string,
  lessonSectionId: string,
  status: StudentHomeworkStatus,
  text: string,
  work?: LessonSectionBlockState[],
  assessmentMethod: AssessmentMethod
}

export class StudentHomework extends Aggregate<string, StudentHomeworkProps> {
  constructor(id: string, props: StudentHomeworkProps) {
    super(id, props)
  }

  get userId() { return this._props.userId }
  get lessonSectionId() { return this._props.lessonSectionId }
  get status() { return this._props.status }
  get text() { return this._props.text }
  get work() { return this._props.work }
  get assessmentMethod() { return this._props.assessmentMethod }

  submit() { this._props.status = 'pending' }
  setWork(work: LessonSectionBlockState[]) { this._props.work = work }
}
