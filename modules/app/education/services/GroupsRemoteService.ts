import type { GetGroupResponse, GetGroupsResponse, CreateGroupRequest, UpdateGroupResponse, UpdateGroupRequest } from '@classroom/protocol/GroupsService'

import { RemoteService } from '@classroom/app/shared'

export class GroupsService extends RemoteService {
  async create(group: CreateGroupRequest) {
    return await this.post('/groups', group)
  }

  async getOne(id: string): Promise<GetGroupResponse> {
    return await this.get(`/groups/${id}`)
  }

  async getAll(): Promise<GetGroupsResponse> {
    return await this.get('/groups')
  }

  async update(id: string, request: UpdateGroupRequest): Promise<UpdateGroupResponse> {
    return await this.patch(`/groups/${id}`, request)
  }

  async find(query: string): Promise<GetGroupsResponse> {
    return await this.get('/groups', { query })
  }
}
