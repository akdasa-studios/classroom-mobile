
export type LessonSectionBlock =
  | LessonSectionVideoBlock
  | LessonSectionAudioBlock
  | LessonSectionTextBlock
  | LessonSectionQuizBlock


interface LessonSectionBlockBase {
  type: string
}


export interface LessonSectionVideoBlock
  extends LessonSectionBlockBase
{
  type: 'video'
  videoUrl: string
  posterUrl: string
}

export interface LessonSectionAudioBlock
  extends LessonSectionBlockBase
{
  type: 'audio'
  url: string
}

export interface LessonSectionTextBlock
  extends LessonSectionBlockBase
{
  type: 'text'
  content: string
}

export interface LessonSectionQuizBlock
  extends LessonSectionBlockBase
{
  type: 'quiz'
  question: string,
  answers: string[]
  rightAnswer: number
}
