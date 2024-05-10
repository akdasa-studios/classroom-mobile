import { LessonSectionBlock } from './LessonSectionBlock'

export type LessonSection = {
  _id: string
  lessonId: string
  title: string
  blocks: LessonSectionBlock[]
}
