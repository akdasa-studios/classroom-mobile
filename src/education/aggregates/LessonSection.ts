import { Aggregate } from '@/shared'
import { LessonSectionBlock } from './LessonSectionBlock'

export type LessonSectionProps = {
  lessonId: string
  title: string
  blocks: LessonSectionBlock[]
}

export class LessonSection extends Aggregate<string, LessonSectionProps> {
  constructor(id: string, props: LessonSectionProps) {
    super(id, props)
  }

  get lessonId() { return this._props.lessonId }
  get title() { return this._props.title }
  get blocks() { return this._props.blocks }
}
