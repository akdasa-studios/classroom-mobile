import { Database } from '@classroom/app/education'
import { studentHomeworks } from '@classroom/app/shared/fixtures'

export async function downloadStudentHomework() {
  // const studentHomeworks = await Repositories.Remote.StudentHomeworks.find(OfStudent(userId))
  // studentHomeworks.entities.forEach(x => Repositories.Cache.StudentHomeworks.save(x))
  studentHomeworks.forEach(x => Database.StudentHomeworks.save(x))
}
