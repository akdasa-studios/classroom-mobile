import { useDownloaderQueue } from '@/shared'
import { LessonSectionVideoBlock } from './../aggregates/LessonSectionBlock'
import {
  Repositories, OfUser, OfCourses, OfLessons, OfStudent, NotSubmitted, Group, Enrollment
} from '@/education'
import { Services } from '@/education'
import { lessonSectionFixtures, lessonsFixtures, studentHomeworks } from '@/shared/fixtures'

const Downloader = useDownloaderQueue()

export async function UploadToRemoteServer() {
  const notSubmittedEnrollments = await Repositories.Enrollments.find(NotSubmitted())
  for (const e of notSubmittedEnrollments) {
    await Services.Enrollments.create({
      id: e._id,
      groupId: e.groupId,
      courseId: e.courseId,
    })
    e.status = 'pending'
    await Repositories.Enrollments.save(e)
  }
}


export async function SyncWithRemoteServer(
  userId: string = 'a243727d-57ab-4595-ba17-69f3a0679bf6'
) {
  console.log('courses')
  const courses = await Services.Courses.getAll()
  courses.items.forEach(x => Repositories.Courses.save({
    _id: x.id,
    title: x.title,
    subtitle: x.subtitle,
    summary: x.description,
    coverImageUrl: x.coverImageUrl
  }))

  // TODO avatarURl
  console.log('groups')
  const groups = await Services.Groups.getAll() // TODO: get active only groups
  groups.items.forEach(x => Repositories.Groups.save({
    _id: x.id,
    name: x.name,
    courseId: x.course.id,
    couratorName: x.leader.name,
    couratorAvatarUrl: x.leader.avatarUrl || "https://i.pravatar.cc/300",
    startsAt: new Date(x.startsAt).getTime()
  }))

  console.log('enrollments')
  const enrollments = await Services.Enrollments.getAll()
  enrollments.items.forEach(x => Repositories.Enrollments.save({
    _id: x.id,
    userId: x.applicant.id,
    groupId: x.group.id,
    courseId: x.course.id,
    status: x.status
  }))

  console.log('lessons')
  // const myCourses = enrollments.items.map(x => new UuidIdentity(x.course.id))
  // const lessons = await Repositories.Remote.Lessons.find(OfCourses(myCourses))
  // lessons.entities.forEach(x => Repositories.Cache.Lessons.save(x))
  lessonsFixtures.forEach(x => Repositories.Lessons.save(x))

  console.log('lessons sections')
  // const myLessons = lessons.entities.map(x => x.id)
  // const lessonSections = await Repositories.Remote.LessonSections.find(OfLessons(myLessons))
  // lessonSections.entities.forEach(x => Repositories.Cache.LessonSections.save(x))
  lessonSectionFixtures.forEach(x => Repositories.LessonSections.save(x))

  console.log('student homeworks')
  // const studentHomeworks = await Repositories.Remote.StudentHomeworks.find(OfStudent(userId))
  // studentHomeworks.entities.forEach(x => Repositories.Cache.StudentHomeworks.save(x))
  studentHomeworks.forEach(x => Repositories.StudentHomeworks.save(x))

  console.log('files')
  groups.items.forEach(x => Downloader.addToQueue(x.leader.avatarUrl, `Avatar of ${x.leader.name}`))
  courses.items.forEach(x => Downloader.addToQueue(x.coverImageUrl, `Cover image of ${x.title}`))
  // lessonSections.entities.forEach(function (x) {
  //   const lesson = lessons.entities.find(l => x.lessonId.equals(l.id))

  //   const sections = x.blocks.filter(x => x.type === 'video') as LessonSectionVideoBlock[]
  //   sections.forEach(x => Downloader.addToQueue(x.videoUrl, `Lesson video ${lesson?.title}`))
  //   sections.forEach(x => Downloader.addToQueue(x.posterUrl, `Lesson poster ${lesson?.title}`))
  // })

  console.log('done')
}
