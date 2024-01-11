import { LessonSectionVideoBlock } from './../aggregates/LessonSectionBlock'
import {
  Repositories, OfUser, OfCourses, OfLessons, OfStudent
} from '@/education'
import { Downloader } from '@/shared'



export async function SyncWithRemoteServer(
  userId: string = 'a243727d-57ab-4595-ba17-69f3a0679bf6'
) {
  console.log('courses')
  const courses = await Repositories.Remote.Courses.all() // TODO: active only
  courses.entities.forEach(x => Repositories.Cache.Courses.save(x))

  console.log('groups')
  const groups = await Repositories.Remote.Groups.all() // TODO: get active only groups
  groups.entities.forEach(x => Repositories.Cache.Groups.save(x))

  console.log('enrollments')
  const enrollments = await Repositories.Remote.Enrollemnts.find(OfUser(userId))
  enrollments.entities.forEach(x => Repositories.Cache.Enrollments.save(x))

  console.log('lessons')
  const myCourses = enrollments.entities.map(x => x.courseId)
  const lessons = await Repositories.Remote.Lessons.find(OfCourses(myCourses))
  lessons.entities.forEach(x => Repositories.Cache.Lessons.save(x))

  console.log('lessons sections')
  const myLessons = lessons.entities.map(x => x.id)
  const lessonSections = await Repositories.Remote.LessonSections.find(OfLessons(myLessons))
  lessonSections.entities.forEach(x => Repositories.Cache.LessonSections.save(x))

  console.log('student homeworks')
  const studentHomeworks = await Repositories.Remote.StudentHomeworks.find(OfStudent(userId))
  studentHomeworks.entities.forEach(x => Repositories.Cache.StudentHomeworks.save(x))

  console.log('files')
  groups.entities.forEach(x => Downloader.addToQueue({ url: x.couratorAvatarUrl }))
  lessonSections.entities.forEach(function (x) {
    const sections = x.blocks.filter(x => x.type === 'video') as LessonSectionVideoBlock[]
    sections.forEach(x => Downloader.addToQueue({ url: x.videoUrl }))
    sections.forEach(x => Downloader.addToQueue({ url: x.posterUrl }))
  })

  console.log('done')
}
