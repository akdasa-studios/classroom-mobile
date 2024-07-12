import { Database, Group, GroupsService } from "@classroom/app/education"
import { useConfig } from "@classroom/app/shared"

export async function downloadGroups() {
  const config = useConfig()
  const groupsService = new GroupsService(
    config.baseUrl.value, config.accessToken.value
  )

  const groups = await groupsService.getAll() // TODO: get active only groups
  for (const x of groups.items) {
    await Database.Groups.save(new Group(x.id, {
      name: x.name,
      courseId: x.course.id,
      couratorName: x.leader.name,
      couratorAvatarUrl: x.leader.avatarUrl,
      startsAt: new Date(x.startsAt)
    }))
  }
}