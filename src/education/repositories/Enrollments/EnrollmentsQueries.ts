import { Enrollment } from '@/education'
import { QueryBuilder } from '@/shared'

const qb = new QueryBuilder<Enrollment>()

// export const OfUser = (userId: string) => qb.and(qb.eq('userId', userId), qb.eq('archivedAt', undefined))
// export const NotSubmitted = () => qb.eq('status', 'not-submitted')
// export const DeclinedBy = (userId: string) => qb.eq('declinedBy', userId)
// export const ShouldSync = () => qb.eq('shouldSync', true)
// export const IsArchived = () => qb.not(qb.eq('archivedAt', undefined))
// export const DeclinedByAndNotSynced = (userId: string) => qb.and(DeclinedBy(userId), ShouldSync())
// export const ArchivedAndNotSynced = () => qb.and(IsArchived(), ShouldSync())