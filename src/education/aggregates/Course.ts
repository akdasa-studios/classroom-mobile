import { Aggregate, UuidIdentity } from '@framework/domain'

export type CourseIdentity = UuidIdentity<'Course'>


export class Course
  extends Aggregate<CourseIdentity>
{
  constructor(
    identity: CourseIdentity,
    public title: string,
    public subtitle: string,
    public summary: string,
    public coverImageUrl: string
  ) {
    super(identity)
  }
}