import { QueryBuilder } from '@framework/persistence'
import { Enrollment } from '@/education'


const qb = new QueryBuilder<Enrollment>()

export const OfUser = (userId: string) => qb.eq('userId', userId)