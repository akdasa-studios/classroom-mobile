import { QueryBuilder } from '@framework/persistence'
import { Enrollment, Group } from '@/education'


const qb = new QueryBuilder<Group>()

export const GroupsOfCourse = (courseId: string) => qb.eq('courseId', courseId)
export const Groups = (groupIds: string[]) => qb.in('id', groupIds)
export const GroupsRelatedToEnrollments = (r: readonly Enrollment[]) => Groups(r.filter(x => x.isAssignedToGroup && x.groupId).map(x => x.groupId!.value))
