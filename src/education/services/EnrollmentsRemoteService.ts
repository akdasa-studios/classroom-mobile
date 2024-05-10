import type { GetEnrollmentResponse, GetEnrollmentsResponse, CreateEnrollmentRequest, UpdateEnrollmentResponse, UpdateEnrollmentRequest } from '@protocol/EnrollmentsService'

import { RemoteService } from '@/shared'

export class EnrollmentsService extends RemoteService {
  async create(enrollment: CreateEnrollmentRequest) {
    return await this.post("http://localhost:3000/enrollments", enrollment)
  }

  async getOne(id: string): Promise<GetEnrollmentResponse> {
    return await this.get(`http://localhost:3000/enrollments/${id}`)
  }

  async getAll(): Promise<GetEnrollmentsResponse> {
    return await this.get("http://localhost:3000/enrollments")
  }

  async update(id: string, request: UpdateEnrollmentRequest): Promise<UpdateEnrollmentResponse> {
    return await this.patch(`http://localhost:3000/enrollments/${id}`, request)
  }

  async find(query: string): Promise<GetEnrollmentsResponse> {
    return await this.get("http://localhost:3000/enrollments", { query })
  }

  async remove(id: string): Promise<void> {
    return await this.delete(`http://localhost:3000/enrollments/${id}`)
  }
}
