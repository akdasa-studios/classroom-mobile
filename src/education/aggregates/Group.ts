import { Aggregate, UuidIdentity } from '@framework/domain'
import { CourseIdentity } from './Course'


export type GroupIdentity = UuidIdentity<'Group'>

export class Group
  extends Aggregate<GroupIdentity>
{
  constructor(
    identity: GroupIdentity,
    public courseId: CourseIdentity,
    public name: string,
    public couratorName: string,
    public couratorAvatarUrl: string,
    public startsAt: number
  ) {
    super(identity)
  }
}