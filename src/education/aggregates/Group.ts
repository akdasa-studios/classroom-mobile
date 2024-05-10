export type Group = {
  _id: string
  name: string
  courseId: string
  couratorName: string
  couratorAvatarUrl: string
  startsAt: number
}

export const UnknownGroupId = '00000000-0000-0000-0000-000000000000';