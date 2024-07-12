import { Aggregate } from '@classroom/app/shared'

export type EnrollmentStatus = 'not-submitted' | 'pending' | 'approved' | 'declined' | 'graduated'

export type EnrollmentProps = {
  groupId?: string
  courseId: string
  status: EnrollmentStatus
  declinedBy?: string
  archivedAt?: Date
}

export class Enrollment extends Aggregate<string, EnrollmentProps> {
  constructor(id: string, props: EnrollmentProps) {
    super(id, props)
  }

  get groupId() { return this._props.groupId }
  get courseId() { return this._props.courseId }
  get status() { return this._props.status }
  get declinedBy() { return this._props.declinedBy }
  get archivedAt() { return this._props.archivedAt }

  submit() { this._props.status = 'pending' }
  decline(userId: string) { this._props.status = 'declined', this._props.declinedBy = userId }
  archive() { this._props.archivedAt = new Date() }

  get isNotSubmitted() { return this.status === 'not-submitted' }
  get isApproved() { return this.status === 'approved' }
  get isPending() { return this.status === 'pending' }
  get isDeclined() { return this.status === 'declined' }
  get isArchived() { return this.archivedAt !== undefined }
  get isAssignedToGroup() { return this.groupId !== undefined }
  isDeclinedBy(userId: string) {
    return this.status === 'declined' && this.declinedBy === userId
  }
}

export const EmptyEnrollment = (): Enrollment => {
  return new Enrollment('', {
    courseId: '',
    status: 'not-submitted',
  })
}
