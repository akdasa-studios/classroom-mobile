import { Aggregate } from "@/shared"

export type CourseProps = {
  title: string,
  subtitle: string,
  summary: string,
  coverImageUrl: string
}

export class Course extends Aggregate<string, CourseProps> {
  constructor(id: string, props: CourseProps) {
    super(id, props)
  }

  get title() { return this._props.title }
  get subtitle() { return this._props.subtitle }
  get summary() { return this._props.summary }
  get coverImageUrl() { return this._props.coverImageUrl }
}


export const EmptyCourse = (): Course => new Course('', {
  title: '', subtitle: '', summary: '', coverImageUrl: ''
})