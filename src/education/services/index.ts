import { CoursesService } from "./CoursesRemoteService"
import { GroupsService } from "./GroupsRemoteService"
import { EnrollmentsService } from "./EnrollmentsRemoteService"

export const Services = {
  Courses: new CoursesService(),
  Groups: new GroupsService(),
  Enrollments: new EnrollmentsService(),
}