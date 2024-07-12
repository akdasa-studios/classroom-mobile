import { Aggregate } from '@classroom/app/shared'

export type GroupProps = {
  name: string
  courseId: string
  couratorName: string
  couratorAvatarUrl: string
  startsAt: Date
}

export class Group extends Aggregate<string, GroupProps> {
  constructor(id: string, props: GroupProps) {
    super(id, props)
  }

  public get name() { return this._props.name }
  public get courseId() { return this._props.courseId }
  public get couratorName() { return this._props.couratorName }
  public get couratorAvatarUrl() { return this._props.couratorAvatarUrl }
  public get startsAt() { return this._props.startsAt }
}

export const UnknownGroupId = '00000000-0000-0000-0000-000000000000'
