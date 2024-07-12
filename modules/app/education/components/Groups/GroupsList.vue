<template>
  <IonRadioGroup
    v-model="model"
  >
    <GroupsListItem
      v-for="group in groups"
      :id="group.id"
      :key="group.id"
      :name="group.name"
      :leader="group.leader"
      :info="group.info"
      :image-url="group.imageUrl"
      :starts-at="group.startsAt"
    />
  </IonRadioGroup>
</template>


<script setup lang="ts">
import { IonRadioGroup } from '@ionic/vue'
import { GroupsListItem } from '@classroom/app/education'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

export interface GroupViewModel {
  id: string,
  name: string,
  leader?: string,
  info?: string,
  imageUrl: string,
  startsAt?: number
}

defineProps<{
  groups: GroupViewModel[]
}>()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const model = defineModel<string>()
</script>
