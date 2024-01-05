import { QueryBuilder } from '@framework/persistence'
import { EnrollmentRequest, Group } from '@/education'


const qb = new QueryBuilder<Group>()

export const GroupsOfCourse = (courseId: string) => qb.eq('courseId.value', courseId)
export const Groups = (groupIds: string[]) => qb.in('id.value', groupIds)
export const GroupsRelatedToEnrollmentRequests = (r: readonly EnrollmentRequest[]) => Groups(r.map(x => x.groupId.value))