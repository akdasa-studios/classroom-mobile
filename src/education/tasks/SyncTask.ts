import { useDownloaderQueue } from '@/shared'
import { LessonSectionVideoBlock } from './../aggregates/LessonSectionBlock'
import {
  Repositories, OfUser, OfCourses, OfLessons, OfStudent, NotSubmitted, Course, Group, Enrollment, CourseIdentity
} from '@/education'
import { Services } from '@/education'
import { UuidIdentity } from '@framework/domain'

const Downloader = useDownloaderQueue()

export async function UploadToRemoteServer() {
  const notSubmittedEnrollments = await Repositories.Cache.Enrollments.find(NotSubmitted())
  for (const e of notSubmittedEnrollments.entities) {
    await Services.Enrollments.create({
      id: e.id.value,
      groupId: e.groupId?.value,
      courseId: e.courseId.value,
    })
    e.submit()
    await Repositories.Remote.Enrollemnts.save(e)
  }
}


export async function SyncWithRemoteServer(
  userId: string = 'a243727d-57ab-4595-ba17-69f3a0679bf6'
) {
  console.log('courses')
  const courses = await Services.Courses.getAll()
  courses.items.forEach(x => Repositories.Cache.Courses.save(
    new Course(new UuidIdentity(x.id), x.title, x.subtitle, x.description, x.coverImageUrl)
  ))

  // TODO avatarURl
  console.log('groups')
  const groups = await Services.Groups.getAll() // TODO: get active only groups
  groups.items.forEach(x => Repositories.Cache.Groups.save(
    new Group( new UuidIdentity(x.id), new UuidIdentity(x.course.id), x.name, x.leader.name, x.leader.avatarUrl || "https://i.pravatar.cc/300", new Date(x.startsAt).getTime())
  ))

  console.log('enrollments')
  const enrollments = await Services.Enrollments.getAll()
  enrollments.items.forEach(x => Repositories.Cache.Enrollments.save(
    new Enrollment(new UuidIdentity(x.id), userId, new UuidIdentity(x.group.id), new UuidIdentity(x.course.id), x.status)
  ))

  console.log('lessons')
  const myCourses = enrollments.items.map(x => new UuidIdentity(x.course.id) as CourseIdentity)
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
  groups.items.forEach(x => Downloader.addToQueue(x.leader.avatarUrl, `Avatar of ${x.leader.name}`))
  courses.items.forEach(x => Downloader.addToQueue(x.coverImageUrl, `Cover image of ${x.title}`))
  lessonSections.entities.forEach(function (x) {
    const lesson = lessons.entities.find(l => x.lessonId.equals(l.id))

    const sections = x.blocks.filter(x => x.type === 'video') as LessonSectionVideoBlock[]
    sections.forEach(x => Downloader.addToQueue(x.videoUrl, `Lesson video ${lesson?.title}`))
    sections.forEach(x => Downloader.addToQueue(x.posterUrl, `Lesson poster ${lesson?.title}`))
  })

  console.log('done')
}
