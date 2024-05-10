export type Enrollment = {
  _id: string
  userId: string
  groupId: string | undefined
  courseId: string
  status: 'not-submitted' | 'pending' | 'approved' | 'declined' | 'graduated'
}

// export type EnrollmentIdentity = UuidIdentity<'Enrollment'>
// export type EnrollmentStatus = 'not-submitted' | 'pending' | 'approved' | 'declined' | 'graduated'

// export class Enrollment
//   extends Aggregate<EnrollmentIdentity>
// {
//   private _userId: string
//   private _groupId: GroupIdentity | undefined
//   private _courseId: CourseIdentity
//   private _status: EnrollmentStatus

//   constructor(
//     identity: EnrollmentIdentity,
//     userId: string,
//     groupId: GroupIdentity | undefined,
//     courseId: CourseIdentity,
//     status: EnrollmentStatus
//   ) {
//     super(identity)

//     this._userId = userId
//     this._groupId = groupId
//     this._courseId = courseId
//     this._status = status
//   }

//   get userId(): string {
//     return this._userId
//   }

//   get groupId(): GroupIdentity | undefined {
//     return this._groupId
//   }

//   get courseId(): CourseIdentity {
//     return this._courseId
//   }

//   get status(): EnrollmentStatus {
//     return this._status
//   }

//   submit() {
//     this._status = 'pending'
//   }

//   enroll(groupId: GroupIdentity) {
//     this._groupId = groupId
//     this._status = 'approved'
//   }

//   get isAssignedToGroup() {
//     return this.groupId !== undefined
//   }
// }
