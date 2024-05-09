<template>
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
</template>


<script setup lang="ts">
import { computed } from 'vue'
import { IonItem, IonLabel, IonAvatar, IonText } from '@ionic/vue'
import { CachedImage } from '@/shared'
import { EnrollmentStatus } from '@/education';

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  id: string
  courseName: string,
  groupName?: string,
  imageUrl: string
  status: EnrollmentStatus
}>()

const emit = defineEmits<{
  click: [],
}>()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const showStatus = computed(() => props.status !== 'approved')


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onClicked() {
  emit('click')
}
</script>


<fluent locale="en">
not-submitted = Not submitted
pending = Pending
in-review = In Review
approved = Approved
declined = Declined
</fluent>

<fluent locale="ru">
not-submitted = Не отправлено
pending = В ожидании
in-review = На рассмотрении
approved = Одобрено
declined = Отклонено
</fluent>
