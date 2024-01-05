import { QueryBuilder } from '@framework/persistence'
import { Enrollment, Group } from '@/education'


const qb = new QueryBuilder<Group>()

export const GroupsOfCourse = (courseId: string) => qb.eq('courseId.value', courseId)
export const Groups = (groupIds: string[]) => qb.in('id.value', groupIds)
export const GroupsRelatedToEnrollments = (r: readonly Enrollment[]) => Groups(r.map(x => x.groupId.value))