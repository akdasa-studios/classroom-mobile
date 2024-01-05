import { Aggregate, UuidIdentity } from '@framework/domain'
import { GroupIdentity } from './Group'


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
    public groupId: GroupIdentity,
    public status: EnrollmentStatus
  ) {
    super(identity)
  }
}
