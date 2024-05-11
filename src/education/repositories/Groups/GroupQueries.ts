import { Enrollment, Group } from "@/education"
import { QueryBuilder } from "@/shared"

const qb = new QueryBuilder<Group>()

export const GroupsOfCourse = (courseId: string) => qb.eq('courseId', courseId)
export const Groups = (groupIds: string[]) => qb.in('id', groupIds)
//@ts-ignore
export const GroupsRelatedToEnrollments = (r: readonly Enrollment[]) => Groups(r.filter(x => x.groupId != undefined).map(x => x.groupId))
