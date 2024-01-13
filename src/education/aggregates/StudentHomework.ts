import { Aggregate, UuidIdentity } from '@framework/domain'
import { LessonSectionIdentity } from './LessonSection'
import { LessonSectionBlockState } from './LessonSectionBlock'

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
    public readonly status: StudentHomeworkStatus,
    public readonly text: string,
    public work?: LessonSectionBlockState[],
  ) {
    super(identity)
  }
}
