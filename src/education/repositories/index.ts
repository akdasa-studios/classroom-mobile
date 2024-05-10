import { CacheEnrollmentsRepository } from './Enrollments/EnrollmentsRepository'
import { CacheGroupsRepository } from './Groups/GroupsRepository'
import { CacheCoursesRepository }  from './Courses/CoursesRepository'
import { CacheLessonsRepository }  from './Lessons/LessonsRepository'
import { CacheLessonSectionsRepository }  from './Lessons/LessonSectionsRepository'
import { CacheStudentHomeworksRepository } from './StudentHomeworks/StudentHomeworksRepository'

export const Repositories = {
  Enrollments: CacheEnrollmentsRepository,
  Groups: CacheGroupsRepository,
  Courses: CacheCoursesRepository,
  Lessons: CacheLessonsRepository,
  LessonSections: CacheLessonSectionsRepository,
  StudentHomeworks: CacheStudentHomeworksRepository,
}
