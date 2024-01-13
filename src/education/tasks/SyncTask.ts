import { useDownloaderQueue } from '@/shared'
import { LessonSectionVideoBlock } from './../aggregates/LessonSectionBlock'
import {
  Repositories, OfUser, OfCourses, OfLessons, OfStudent, NotSubmitted
} from '@/education'

const Downloader = useDownloaderQueue()

export async function UploadToRemoteServer() {
  const notSubmittedEnrollments = await Repositories.Cache.Enrollments.find(NotSubmitted())
  for (const e of notSubmittedEnrollments.entities) {
    await Repositories.Remote.Enrollemnts.save(e)
    console.log(notSubmittedEnrollments.entities)
  }
}


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
  groups.entities.forEach(x => Downloader.addToQueue(x.couratorAvatarUrl, `Avatar of ${x.couratorName}`))
  courses.entities.forEach(x => Downloader.addToQueue(x.coverImageUrl, `Cover image of ${x.title}`))
  lessonSections.entities.forEach(function (x) {
    const lesson = lessons.entities.find(l => x.lessonId.equals(l.id))

    const sections = x.blocks.filter(x => x.type === 'video') as LessonSectionVideoBlock[]
    sections.forEach(x => Downloader.addToQueue(x.videoUrl, `Lesson video ${lesson?.title}`))
    sections.forEach(x => Downloader.addToQueue(x.posterUrl, `Lesson poster ${lesson?.title}`))
  })

  console.log('done')
}
