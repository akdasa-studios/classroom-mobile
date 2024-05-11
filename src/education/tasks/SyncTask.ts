import { useDownloaderQueue } from '@/shared'
import { lessonSectionFixtures, lessonsFixtures, studentHomeworks } from '@/shared/fixtures'
import { Database, UnknownGroupId, Services, Course, Group, Enrollment } from '@/education'

const Downloader = useDownloaderQueue()

export async function UploadToRemoteServer(
  userId: string,
  authToken: string,
) {
  Services.Courses.setToken(authToken)
  Services.Groups.setToken(authToken)
  Services.Enrollments.setToken(authToken)

  if (authToken) {
    const enrollments = await Database.Enrollments.all()
    for (const enrollment of enrollments) {
      if (enrollment.isNotSubmitted) {
          await Services.Enrollments.create({
            id: enrollment.id,
            groupId: enrollment.groupId !== UnknownGroupId ? enrollment.groupId : undefined,
            courseId: enrollment.courseId,
          })
          enrollment.submit()
          await Database.Enrollments.save(enrollment)
      }

      if (enrollment.isDeclinedBy(userId)) {
        // TODO: check if is not allery updated
        await Services.Enrollments.update(enrollment.id, { status: 'declined' })
        await Database.Enrollments.delete(enrollment.id)
        await Services.Enrollments.remove(enrollment.id)
      }

      if (enrollment.isArchived) {
        await Services.Enrollments.remove(enrollment.id)
        await Database.Enrollments.delete(enrollment.id)
      }
    }
  }
}


export async function SyncWithRemoteServer(
  userId: string,
  authToken: string,
) {
  Services.Courses.setToken(authToken)
  Services.Groups.setToken(authToken)
  Services.Enrollments.setToken(authToken)

  console.log('courses')
  const courses = await Services.Courses.getAll()
  for (const x of courses.items) {
    await Database.Courses.save(new Course(x.id, {
      title: x.title,
      subtitle: x.subtitle,
      summary: x.description,
      coverImageUrl: x.coverImageUrl
    }))
  }

  // TODO avatarURl
  console.log('groups')
  const groups = await Services.Groups.getAll() // TODO: get active only groups
  for (const x of groups.items) {
    await Database.Groups.save(new Group(x.id, {
      name: x.name,
      courseId: x.course.id,
      couratorName: x.leader.name,
      couratorAvatarUrl: x.leader.avatarUrl,
      startsAt: new Date(x.startsAt)
    }))
  }

  if (authToken) {
    console.log('enrollments')
    const enrollments = await Services.Enrollments.getAll()
    for (const e of enrollments.items) {
      await Database.Enrollments.save(new Enrollment(e.id, {
        groupId: e.group?.id,
        courseId: e.course.id,
        status: e.status,
        declinedBy: e.declinedBy,
      }))
    }
  }

  console.log('lessons')
  // const myCourses = enrollments.items.map(x => new UuidIdentity(x.course.id))
  // const lessons = await Repositories.Remote.Lessons.find(OfCourses(myCourses))
  // lessons.entities.forEach(x => Repositories.Cache.Lessons.save(x))
  lessonsFixtures.forEach(x => Database.Lessons.save(x))

  console.log('lessons sections')
  // const myLessons = lessons.entities.map(x => x.id)
  // const lessonSections = await Repositories.Remote.LessonSections.find(OfLessons(myLessons))
  // lessonSections.entities.forEach(x => Repositories.Cache.LessonSections.save(x))
  lessonSectionFixtures.forEach(x => Database.LessonSections.save(x))

  console.log('student homeworks')
  // const studentHomeworks = await Repositories.Remote.StudentHomeworks.find(OfStudent(userId))
  // studentHomeworks.entities.forEach(x => Repositories.Cache.StudentHomeworks.save(x))
  studentHomeworks.forEach(x => Database.StudentHomeworks.save(x))

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
