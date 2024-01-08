import { Aggregate, UuidIdentity } from '@framework/domain'
import { LessonIdentity } from './Lesson'
import { LessonSectionBlock } from './LessonSectionBlock'


export type LessonSectionIdentity = UuidIdentity<'LessonSection'>

export class LessonSection
  extends Aggregate<LessonSectionIdentity>
{
  constructor(
    identity: LessonSectionIdentity,
    public readonly lessonId: LessonIdentity,
    public readonly title: string,
    public readonly blocks: LessonSectionBlock[]
  ) {
    super(identity)
  }
}