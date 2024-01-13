import { Aggregate, UuidIdentity } from '@framework/domain'
import { EnrollmentStatus } from '@core/aggregates'
import { GroupIdentity } from './Group'
import { CourseIdentity } from './Course'


export type EnrollmentIdentity = UuidIdentity<'Enrollment'>


export class Enrollment
  extends Aggregate<EnrollmentIdentity>
{
  private _userId: string
  private _groupId: GroupIdentity | undefined
  private _courseId: CourseIdentity
  private _status: EnrollmentStatus

  constructor(
    identity: EnrollmentIdentity,
    userId: string,
    groupId: GroupIdentity | undefined,
    courseId: CourseIdentity,
    status: EnrollmentStatus
  ) {
    super(identity)

    this._userId = userId
    this._groupId = groupId
    this._courseId = courseId
    this._status = status
  }

  get userId(): string {
    return this._userId
  }

  get groupId(): GroupIdentity | undefined {
    return this._groupId
  }

  get courseId(): CourseIdentity | undefined {
    return this._courseId
  }

  get status(): EnrollmentStatus {
    return this._status
  }

  enroll(groupId: GroupIdentity) {
    this._groupId = groupId
    this._status = EnrollmentStatus.Approved
  }

  get isAssignedToGroup() {
    return this.groupId !== undefined
  }
}
