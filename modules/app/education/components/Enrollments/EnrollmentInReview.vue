<template>
  <image-and-button-layout
    image="/wait.webp"
    :action="$t('wait-more')"
    :danger-action="$t('cancel-enrollment')"
    :danger-action-alert="$t('cancel-enrollment-alert')"
    @click="onButtonClicked"
  >
    <h1>{{ $t('wait') }}</h1>
    {{ $t('in-progress') }}
  </image-and-button-layout>
</template>


<script setup lang="ts">
import { ImageAndButtonLayout } from '@classroom/app/shared'

// --- Interface -------------------------------------------------------------
const emit = defineEmits<{
  close: []
  declineEnrollment: []
}>()

// --- Handlers --------------------------------------------------------------
function onButtonClicked(action: 'normal' | 'danger') {
  if (action === 'normal') {
    emit('close')
  } else {
    emit('declineEnrollment')
  }
}
</script>


<fluent locale="en">
wait = Wait
in-progress = Application pending
wait-more = Wait more
cancel-enrollment = Cancel enrollment
cancel-enrollment-alert = Your application will be canceled and we will not be able to add you to the group
</fluent>


<fluent locale="ru">
wait = Ожидайте
in-progress = Заявка на рассмотрении
wait-more = Подождать еще
cancel-enrollment = Отменить заявку
cancel-enrollment-alert = Ваша заявка будет отменена и мы не сможем добавить вас в группу
</fluent>
