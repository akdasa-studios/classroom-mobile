<template>
  <IonItemSliding ref="slidingItem">
    <IonItem
      :detail="true"
      lines="none"
      @click="onClicked"
    >
      <IonAvatar
        slot="start"
        aria-hidden="true"
      >
        <CachedImage :url="imageUrl" />
      </IonAvatar>

      <IonLabel>
        <h2>{{ courseName }}</h2>
        <p class="ion-text-wrap">
          {{ groupName }}

          <IonText
            v-if="showStatus"
            color="primary"
          >
            {{ $t(status) }}
          </IonText>
        </p>
      </IonLabel>
    </IonItem>

    <IonItemOptions>
      <IonItemOption
        color="danger"
        @click="onDeleteClicked"
        expandable
      >
        {{ $t('delete') }}
      </IonItemOption>
    </IonItemOptions>
  </IonItemSliding>
</template>


<script setup lang="ts">
import { computed, ref } from 'vue'
import { IonItem, IonLabel, IonAvatar, IonText, IonItemSliding, IonItemOption, IonItemOptions } from '@ionic/vue'
import { CachedImage } from '@classroom/app/shared'

// --- Interface -------------------------------------------------------------
const props = defineProps<{
  id: string
  courseName: string,
  groupName?: string,
  imageUrl: string
  status: string
}>()

const emit = defineEmits<{
  click: [],
  delete: [],
}>()

// --- State -----------------------------------------------------------------
const showStatus = computed(() => props.status !== 'approved')
const slidingItem = ref<typeof IonItemSliding>();

// --- Handlers --------------------------------------------------------------
function onClicked() {
  emit('click')
}

async function onDeleteClicked() {
  await slidingItem.value?.$el.close()
  emit('delete')
}
</script>


<fluent locale="en">
not-submitted = Not submitted
pending = Pending
in-review = In Review
approved = Approved
declined = Declined
delete = Delete
</fluent>

<fluent locale="ru">
not-submitted = Не отправлено
pending = В ожидании
in-review = На рассмотрении
approved = Одобрено
declined = Отклонено
delete = Удалить
</fluent>
