<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>{{ title }}</ion-title>
        <ion-buttons slot="start">
          <ion-back-button />
        </ion-buttons>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">
            {{ title }}
          </ion-title>
        </ion-toolbar>
      </ion-header>

      <img
        :src="coverImageUrl"
      >

      <ion-content class="ion-padding">
        {{ description }}
      </ion-content>
    </ion-content>
  </ion-page>
</template>


<script setup lang="ts">
import { useTask } from '@/shared'
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonBackButton, IonButtons, onIonViewWillEnter } from '@ionic/vue'
import { ResponseCode } from '@protocol/core'
import { GetCourseDetailsTaskTask } from '@protocol/courses'
import { ref } from 'vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  id: string
}>()


/* -------------------------------------------------------------------------- */
/*                                Dependencies                                */
/* -------------------------------------------------------------------------- */

const getCourseDetailsTask = useTask(new GetCourseDetailsTaskTask())

/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const title = ref<string>()
const description = ref<string>()
const coverImageUrl = ref<string>()


/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

onIonViewWillEnter(onFetchRequested)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onFetchRequested() {
  const result = await getCourseDetailsTask.execute({ id: props.id })
  console.log(result)
  if (result.status === ResponseCode.Ok) {
    title.value = result.data.title
    description.value = result.data.description
    coverImageUrl.value = result.data.coverImageUrl
  }
}
</script>
