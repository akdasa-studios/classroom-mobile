<template>
  <with-loader
    :busy="busy"
  >
    <template #loader>
      <groups-list-item-skeleton />
      <groups-list-item-skeleton />
    </template>

    <template #content>
      <groups-list
        v-model="selectedGroup"
        :groups="groups"
      />
    </template>
  </with-loader>
</template>


<script setup lang="ts">
import { onMounted, ref, shallowRef } from 'vue'
import { GroupsList, Group, GroupsListItemSkeleton, GroupViewModel, GroupsOfCourse } from '@/education'
import { WithLoader, useRepository } from '@/shared'
import { groupsFixtures } from '@/shared/fixtures'
import { useFluent } from 'fluent-vue'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const groupsRepo = useRepository<Group>('group', groupsFixtures)
const fluent = useFluent()


/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  courseId: string
}>()


const selectedGroup = defineModel<string>()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const groups = shallowRef<GroupViewModel[]>([])
const busy = ref(false)


/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

onMounted(onFetchData)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onFetchData() {
  busy.value = true
  const response = await groupsRepo.find(GroupsOfCourse(props.courseId))

  const views = response.entities.map(x => ({
    id: x.id.value,
    name: x.name,
    leader: x.couratorName,
    imageUrl: x.couratorAvatarUrl,
    startsAt: x.startsAt
  } as GroupViewModel))

  groups.value = [
    ...views,
    {
      id: 'unknown',
      name: fluent.$t('next-group'),
      info: fluent.$t('next-group-info'),
      imageUrl: 'https://placekitten.com/400/400'
    }
  ]

  if (response.slice.count === 0) {
    selectedGroup.value = 'unknown'
  }

  busy.value = false
}
</script>


<fluent locale="en">
next-group = Next group
next-group-info = You will be enrolled in the group once we launch it
</fluent>