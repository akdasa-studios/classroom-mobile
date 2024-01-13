
export type LessonSectionBlock =
  | LessonSectionVideoBlock
  | LessonSectionAudioBlock
  | LessonSectionTextBlock
  | LessonSectionQuizBlock


interface LessonSectionBlockBase {
  type: string
}

export interface Timestamp {
  time: number,
  title: string
}


export interface LessonSectionVideoBlock
  extends LessonSectionBlockBase
{
  type: 'video'
  videoUrl: string
  posterUrl: string,
  timestamps: Timestamp[]
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


/* -------------------------------------------------------------------------- */
/*                                   States                                   */
/* -------------------------------------------------------------------------- */

export interface LessonSectionState {
  states: LessonSectionBlockState[]
}

export interface LessonSectionBlockState {
  type: string
}

export interface LessonSectionVideoBlockState
  extends LessonSectionBlockState
{
  type: 'video'
  watched: number
  duration: number
}

export interface LessonSectionQuizBlockState
  extends LessonSectionBlockState
{
  type: 'quiz'
  answer: number
}