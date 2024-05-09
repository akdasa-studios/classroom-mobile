import type { GetCourseResponse, GetCoursesResponse, CreateCourseRequest, UpdateCourseResponse, UpdateCourseRequest } from '@protocol/CoursesService'

import { RemoteService } from '@/shared'

export class CoursesService extends RemoteService {
  async create(course: CreateCourseRequest) {
    return await this.post("http://localhost:3000/courses", course)
  }

  async getOne(id: string): Promise<GetCourseResponse> {
    return await this.get(`http://localhost:3000/courses/${id}`)
  }

  async getAll(): Promise<GetCoursesResponse> {
    return await this.get("http://localhost:3000/courses")
  }

  async update(id: string, request: UpdateCourseRequest): Promise<UpdateCourseResponse> {
    return await this.patch(`http://localhost:3000/courses/${id}`, request)
  }

  async find(query: string): Promise<GetCoursesResponse> {
    return await this.get("http://localhost:3000/courses", { query })
  }
}
