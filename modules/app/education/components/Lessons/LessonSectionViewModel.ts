import { LessonSectionBlock } from '@classroom/app/education'

export interface LessonSectionViewModel {
  id: string
  title: string,
  state: 'unknown' | 'open' | 'in-review' | 'returned' | 'accepted'
  homeworkId?: string
  blocks: LessonSectionBlock[]
  work: any
}