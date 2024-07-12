import { EnrollmentsRepository } from './Enrollments/EnrollmentsRepository'
import { GroupsRepository } from './Groups/GroupsRepository'
import { CoursesRepository }  from './Courses/CoursesRepository'
import { LessonsRepository }  from './Lessons/LessonsRepository'
import { LessonSectionsRepository }  from './Lessons/LessonSectionsRepository'
import { StudentHomeworksRepository } from './StudentHomeworks/StudentHomeworksRepository'

export const Database = {
  Enrollments: EnrollmentsRepository,
  Groups: GroupsRepository,
  Courses: CoursesRepository,
  Lessons: LessonsRepository,
  LessonSections: LessonSectionsRepository,
  StudentHomeworks: StudentHomeworksRepository,
}
