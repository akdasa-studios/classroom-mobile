<template>
  <image-and-button-layout
    :image="selfDeclined ? '/enrollment-declined-by-myself.webp' : '/declined.webp'"
    :action="$t('go-back')"
    @click="emit('click')"
  >
    <h1>{{ $t('enrollment-declined') }}</h1>
    {{ selfDeclined ? $t('self-declined') : reason || $t('reason-not-specified') }}
  </image-and-button-layout>
</template>


<script setup lang="ts">
import { ImageAndButtonLayout } from '@/shared'

defineProps<{
  selfDeclined?: boolean
  reason?: string
}>()

const emit = defineEmits<{
  click: []
}>()
</script>


<fluent locale="en">
enrollment-declined = Enrollment declined
go-back = Go back
reason-not-specified = Reason not specified
self-declined = Self declined
</fluent>


<fluent locale="ru">
enrollment-declined = Заявка отклонена
go-back = Назад
reason-not-specified = Причина не указана
self-declined = Самостоятельное отклонение
</fluent>
