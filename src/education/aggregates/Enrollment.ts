import { Aggregate, UuidIdentity } from '@framework/domain'
import { GroupIdentity } from './Group'
import { CourseIdentity } from './Course'


export type EnrollmentIdentity = UuidIdentity<'Enrollment'>


export enum EnrollmentStatus {
  Pending = 'pending',
  InReview = 'in-review',
  Approved = 'approved',
  Declined = 'declined'
}

export class Enrollment
  extends Aggregate<EnrollmentIdentity>
{
  constructor(
    identity: EnrollmentIdentity,
    public userId: string,
    public groupId: GroupIdentity | undefined,
    public courseId: CourseIdentity,
    public status: EnrollmentStatus
  ) {
    super(identity)
  }

  get isAssignedToGroup() {
    return this.groupId !== undefined
  }
}
