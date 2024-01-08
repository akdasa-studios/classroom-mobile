import { QueryBuilder } from '@framework/persistence'
import { StudentHomework } from '../aggregates/StudentHomework'


const qb = new QueryBuilder<StudentHomework>()

export const OfStudent = (userId: string)  => qb.eq('userId', userId)
