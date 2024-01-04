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
import { GroupsList, Group, GroupsListItemSkeleton } from '@/education'
import { WithLoader, useRepository } from '@/shared'
import { groupsFixtures } from '@/shared/fixtures'
import { QueryBuilder } from '@framework/persistence'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  courseId: string
}>()


const selectedGroup = defineModel<string>()

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const groupsRepo = useRepository<Group>('group', groupsFixtures)


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const groups = shallowRef<readonly Group[]>([])
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
  const qb = new QueryBuilder<Group>()
  groups.value = (await groupsRepo.find(qb.eq('courseId.value', props.courseId))).entities
  busy.value = false
}
</script>
