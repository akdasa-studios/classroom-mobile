import { uploadEnrollments } from './uploadEnrollments'
import { uploadSelfDeclinedEnrollments } from './uploadSelfDeclinedEnrollments'
import { uploadArchivedEnrollments } from './uploadArchivedEnrollments'
import { downloadCourses } from './downloadCourses'
import { downloadEnrollments } from './downloadEnrollments'
import { downloadGroups } from './downloadGroups'
import { downloadLessons } from './downloadLessons'
import { downloadLessonSections } from './downloadLessonSections'
import { downloadStudentHomework } from './downloadStudentHomework'

export const steps = [
  uploadEnrollments,
  uploadSelfDeclinedEnrollments,
  uploadArchivedEnrollments,
  downloadCourses,
  downloadEnrollments,
  downloadGroups,
  downloadLessons,
  downloadLessonSections,
  downloadStudentHomework,
]