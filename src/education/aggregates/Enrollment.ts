import { Aggregate, UuidIdentity } from '@framework/domain'
import { EnrollmentStatus } from '@core/aggregates'
import { GroupIdentity } from './Group'
import { CourseIdentity } from './Course'


export type EnrollmentIdentity = UuidIdentity<'Enrollment'>




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
