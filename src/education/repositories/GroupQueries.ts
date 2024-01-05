import { QueryBuilder } from '@framework/persistence'
import { Group } from '@/education'


const qb = new QueryBuilder<Group>()

export const GroupsOfCourse = (courseId: string) => qb.eq('courseId.value', courseId)