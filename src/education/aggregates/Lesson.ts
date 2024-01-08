import { Aggregate, UuidIdentity } from '@framework/domain'
import { CourseIdentity } from './Course'


export type LessonIdentity = UuidIdentity<'Lesson'>

export class Lesson
  extends Aggregate<LessonIdentity>
{
  constructor(
    identity: LessonIdentity,
    public readonly courseId: CourseIdentity,
    public readonly title: string,
    public readonly summary: string,
  ) {
    super(identity)
  }
}