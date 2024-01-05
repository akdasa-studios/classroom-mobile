import { QueryBuilder } from '@framework/persistence'
import { EnrollmentRequest } from '@/education'


const qb = new QueryBuilder<EnrollmentRequest>()

export const OfUser = (userId: string) => qb.eq('userId', userId)