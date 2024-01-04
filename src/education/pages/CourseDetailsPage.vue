<template>
  <item-details-page
    :title="title"
    :fetcher="fetcher"
    :has-padding="false"
  >
    <template #success="{ data }">
      <img :src="data.coverImageUrl">

      <p class="ion-padding">
        {{ data.summary }}

        <ion-button
          expand="block"
          @click="onEnrollButtonClicked"
        >
          {{ $t('enroll') }}
        </ion-button>
      </p>
    </template>

    <template #error>
      Some shit happened
    </template>
  </item-details-page>
</template>


<script setup lang="ts">
import { IonButton, useIonRouter } from '@ionic/vue'
import { ItemDetailsPage, useRepository } from '@/shared'
import { Course } from '@/education'
import { ref } from 'vue'
import { courses } from '@/shared/fixtures'
import { UuidIdentity } from '@framework/domain'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  id: string
}>()


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const router = useIonRouter()
const repository = useRepository<Course>('course', courses)


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const title = ref('')


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onEnrollButtonClicked() {
  router.push({ name: 'enroll', params: { 'id': props.id } })
}


/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

async function fetcher() {
  return await repository.get(new UuidIdentity(props.id))
}
</script>


<fluent locale="en">
enroll = Enroll
</fluent>