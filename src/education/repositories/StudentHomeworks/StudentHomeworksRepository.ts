import { AssessmentMethod, LessonSectionBlockState, StudentHomework, StudentHomeworkStatus } from '@/education'
import { CouchCacheDb, DbScheme, PouchRepository } from '@/shared'

// --- Database Scheme -------------------------------------------------------
export type StudentHomeworkDbScheme = {
  userId: string,
  lessonSectionId: string,
  status: StudentHomeworkStatus,
  text: string,
  work?: LessonSectionBlockState[],
  assessmentMethod: AssessmentMethod
} & DbScheme<'student-homework'>


// --- Serialization & Deserialization ---------------------------------------
const StudentHomeworkSerializer = (
  from: StudentHomework
): StudentHomeworkDbScheme => ({
  _id: from.id,
  '@type': 'student-homework',
  userId: from.userId,
  lessonSectionId: from.lessonSectionId,
  status: from.status,
  text: from.text,
  work: from.work,
  assessmentMethod: from.assessmentMethod,
})

const StudentHomeworkDeserializer = (
  from: StudentHomeworkDbScheme
): StudentHomework => new StudentHomework(from._id, {
  userId: from.userId,
  lessonSectionId: from.lessonSectionId,
  status: from.status,
  text: from.text,
  work: from.work,
  assessmentMethod: from.assessmentMethod,
})


// --- Repositories ----------------------------------------------------------
export const StudentHomeworksRepository = new PouchRepository<StudentHomework, StudentHomeworkDbScheme>(
  CouchCacheDb, 'student-homework',
  StudentHomeworkSerializer,
  StudentHomeworkDeserializer,
)
