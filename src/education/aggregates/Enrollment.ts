export type Enrollment = {
  _id: string
  userId: string
  groupId: string | undefined
  courseId: string
  status: 'not-submitted' | 'pending' | 'approved' | 'declined' | 'graduated'
  declinedBy?: string
  archivedAt?: string

  shouldSync?: boolean
}

export const EmptyEnrollment = (): Enrollment => ({
  _id: '',
  userId: '',
  groupId: undefined,
  courseId: '',
  status: 'not-submitted',
})
