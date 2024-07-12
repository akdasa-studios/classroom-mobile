import { Aggregate } from "@classroom/app/shared"

export type LessonProps = {
  courseId: string
  title: string
  summary: string
}

export class Lesson extends Aggregate<string, LessonProps> {
  constructor(id: string, props: LessonProps) {
    super(id, props)
  }

  get courseId() { return this._props.courseId }
  get title() { return this._props.title }
  get summary() { return this._props.summary }
}