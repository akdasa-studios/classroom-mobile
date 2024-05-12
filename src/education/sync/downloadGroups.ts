import { Database, Group, GroupsService } from "@/education"

export async function downloadGroups(
  userId: string,
  authToken: string,
) {
  const groupsService = new GroupsService(authToken)

  console.log('groups')
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