import { Aggregate, UuidIdentity } from '@framework/domain'
import { GroupIdentity } from './Group'


export type EnrollmentRequestIdentity = UuidIdentity<'EnrollmentRequest'>

export enum EnrollmentRequestStatus {
  Pending = 'pending',
  InReview = 'in-review',
  Approved = 'approved',
  Declined = 'declined'
}

export class EnrollmentRequest
  extends Aggregate<EnrollmentRequestIdentity>
{
  constructor(
    identity: EnrollmentRequestIdentity,
    public userId: string,
    public groupId: GroupIdentity,
    public status: EnrollmentRequestStatus
  ) {
    super(identity)
  }
}
