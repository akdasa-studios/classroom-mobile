import { LessonSectionBlock } from '@/education'

export interface LessonSectionViewModel {
  id: string
  title: string,
  state: 'unknown' | 'open' | 'in-review' | 'returned' | 'accepted'
  blocks: LessonSectionBlock[]
}