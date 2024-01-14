import { Aggregate, UuidIdentity } from '@framework/domain'
import { LessonSectionIdentity } from './LessonSection'
import { LessonSectionBlockState } from './LessonSectionBlock'


export enum AssessmentMethod {
  NotRequired = 'not-required',
  Automatically = 'auto',
  Teacher = 'teacher'
}

export enum StudentHomeworkStatus {
  Open = 'open',
  PendingSubmission = 'pending',
  InReview = 'in-review',
  Returned = 'returned',
  Accepted = 'accepted'
}

export type StudentHomeworkIdentity = UuidIdentity<'StudentHomework'>

export class StudentHomework
  extends Aggregate<StudentHomeworkIdentity>
{
  constructor(
    identity: StudentHomeworkIdentity,
    public readonly userId: string,
    public readonly lessonSectionId: LessonSectionIdentity,
    public status: StudentHomeworkStatus,
    public readonly text: string,
    public work?: LessonSectionBlockState[],
    public assessmentMethod: AssessmentMethod = AssessmentMethod.NotRequired
  ) {
    super(identity)
  }

  sendToReview() {
    this.status = StudentHomeworkStatus.PendingSubmission
  }

  get sendToReviewRequired() {
    return this.assessmentMethod != AssessmentMethod.NotRequired &&
      [StudentHomeworkStatus.Open, StudentHomeworkStatus.Returned].includes(this.status)
  }
}
