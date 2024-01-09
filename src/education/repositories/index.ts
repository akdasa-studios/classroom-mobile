import { RemoteEnrollmentsRepository, CacheEnrollmentsRepository } from './Enrollments/EnrollmentsRepository'
import { RemoteGroupsRepository, CacheGroupsRepository } from './Groups/GroupsRepository'
import { RemoteCoursesRepository, CacheCoursesRepository }  from './Courses/CoursesRepository'
import { RemoteLessonsRepository, CacheLessonsRepository, CacheLessonSectionsRepository, RemoteLessonSectionssRepository }  from './Lessons/LessonsRepository'
import { CacheStudentHomeworksRepository, RemoteStudentHomeworksRepository } from './StudentHomeworks/StudentHomeworksRepository'

export const Cache = {
  Enrollments: CacheEnrollmentsRepository,
  Groups: CacheGroupsRepository,
  Courses: CacheCoursesRepository,
  Lessons: CacheLessonsRepository,
  LessonSections: CacheLessonSectionsRepository,
  StudentHomeworks: CacheStudentHomeworksRepository,
}

export const Repositories = {
  Remote: {
    Enrollemnts: RemoteEnrollmentsRepository,
    Groups: RemoteGroupsRepository,
    Courses: RemoteCoursesRepository,
    Lessons: RemoteLessonsRepository,
    LessonSections: RemoteLessonSectionssRepository,
    StudentHomeworks: RemoteStudentHomeworksRepository
  },
  Cache
}