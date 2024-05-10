import { Enrollment } from '@/education'
import { QueryBuilder } from '@/shared'


const qb = new QueryBuilder<Enrollment>()

export const OfUser = (userId: string) => qb.eq('userId', userId)
export const NotSubmitted = () => qb.eq('status', 'not-submitted')
