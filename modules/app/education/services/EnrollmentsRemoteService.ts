import type { GetEnrollmentResponse, GetEnrollmentsResponse, CreateEnrollmentRequest, UpdateEnrollmentResponse, UpdateEnrollmentRequest } from '@classroom/protocol/EnrollmentsService'

import { RemoteService } from '@classroom/app/shared'

export class EnrollmentsService extends RemoteService {
  async create(enrollment: CreateEnrollmentRequest) {
    return await this.post("/enrollments", enrollment)
  }

  async getOne(id: string): Promise<GetEnrollmentResponse> {
    return await this.get(`/enrollments/${id}`)
  }

  async getAll(): Promise<GetEnrollmentsResponse> {
    return await this.get("/enrollments")
  }

  async update(id: string, request: UpdateEnrollmentRequest): Promise<UpdateEnrollmentResponse> {
    return await this.patch(`/enrollments/${id}`, request)
  }

  async find(query: string): Promise<GetEnrollmentsResponse> {
    return await this.get("/enrollments", { query })
  }

  async remove(id: string): Promise<void> {
    return await this.delete(`/enrollments/${id}`)
  }
}
