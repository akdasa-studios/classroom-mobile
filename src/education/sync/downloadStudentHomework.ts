import { Database } from "@/education"
import { studentHomeworks } from "@/shared/fixtures"

export async function downloadStudentHomework() {
  // const studentHomeworks = await Repositories.Remote.StudentHomeworks.find(OfStudent(userId))
  // studentHomeworks.entities.forEach(x => Repositories.Cache.StudentHomeworks.save(x))
  studentHomeworks.forEach(x => Database.StudentHomeworks.save(x))
}
