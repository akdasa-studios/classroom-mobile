<template>
  <GroupsList
    v-model="selectedGroup"
    :groups="groupsToShow"
  />
</template>


<script setup lang="ts">
import { onMounted, shallowRef, toRefs, watch } from 'vue'
import { GroupsList, Group, GroupViewModel, UnknownGroupId } from '@/education'
import { useFluent } from 'fluent-vue'

/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const fluent = useFluent()


/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  groups: readonly Group[]
}>()


const selectedGroup = defineModel<string>()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const { groups } = toRefs(props)
const groupsToShow = shallowRef<GroupViewModel[]>([])
const NO_CLASS_AVATAR = 'class-is-recruiting-avatar.png'

/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

onMounted(onFetchData)
watch(groups, onFetchData)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onFetchData() {
  const views = props.groups.map(x => ({
    id: x.id,
    name: x.name,
    leader: x.couratorName,
    imageUrl: x.couratorAvatarUrl,
    startsAt: x.startsAt.getTime(),
  } as GroupViewModel))

  groupsToShow.value = [
    ...views,
    {
      id: UnknownGroupId,
      name: fluent.$t('next-group'),
      info: fluent.$t('next-group-info'),
      imageUrl: NO_CLASS_AVATAR
    }
  ]

  if (groups.value.length === 0) {
    selectedGroup.value = 'unknown'
  } else {
    selectedGroup.value = undefined
  }
}
</script>


<fluent locale="en">
next-group = Next group
next-group-info = You will be enrolled in the group once we launch it
</fluent>
