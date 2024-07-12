<template>
  <ImageAndButtonLayout
    image="/enrollment-not-submitted.webp"
    :action="$t('go-back')"
    :danger-action="$t('cancel-enrollment')"
    :danger-action-alert="$t('cancel-enrollment-alert')"
    @click="onButtonClicked"
  >
    <h1>{{ $t('enrollment-not-submitted') }}</h1>
    {{ $t('waiting-internet') }}
  </ImageAndButtonLayout>
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
enrollment-not-submitted = Enrollment has not been submitted yet
waiting-internet = It will be sent as soon as you are online.
go-back = Go back
</fluent>


<fluent locale="ru">
enrollment-not-submitted = Заявка еще не отправлена
waiting-internet = Она будет отправлена, как только вы будете онлайн
go-back = Назад
</fluent>
