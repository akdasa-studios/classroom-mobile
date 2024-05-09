import type { GetGroupResponse, GetGroupsResponse, CreateGroupRequest, UpdateGroupResponse, UpdateGroupRequest } from '@protocol/GroupsService'

import { RemoteService } from '@/shared'

export class GroupsService extends RemoteService {
  async create(group: CreateGroupRequest) {
    return await this.post("http://localhost:3000/groups", group)
  }

  async getOne(id: string): Promise<GetGroupResponse> {
    return await this.get(`http://localhost:3000/groups/${id}`)
  }

  async getAll(): Promise<GetGroupsResponse> {
    return await this.get("http://localhost:3000/groups")
  }

  async update(id: string, request: UpdateGroupRequest): Promise<UpdateGroupResponse> {
    return await this.patch(`http://localhost:3000/groups/${id}`, request)
  }

  async find(query: string): Promise<GetGroupsResponse> {
    return await this.get("http://localhost:3000/groups", { query })
  }
}
