import { EnrollmentService } from '@/education'

export function useEnrollmentService() {
  return new EnrollmentService()
}