export type Course = {
  _id: string,
  title: string,
  subtitle: string,
  summary: string,
  coverImageUrl: string
}

export const EmptyCourse = (): Course => ({
  _id: '', title: '', subtitle: '', summary: '', coverImageUrl: ''
})