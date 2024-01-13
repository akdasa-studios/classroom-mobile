import { QueryBuilder } from '@framework/persistence'
import { Enrollment } from '@/education'
import { EnrollmentStatus } from '@core/aggregates'


const qb = new QueryBuilder<Enrollment>()

export const OfUser = (userId: string) => qb.eq('userId', userId)
export const NotSubmitted = () => qb.eq('status', EnrollmentStatus.NotSubmitted)
