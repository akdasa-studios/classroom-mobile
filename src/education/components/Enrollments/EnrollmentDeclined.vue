<template>
  <image-and-button-layout
    image="/declined.webp"
    :action="$t('go-back')"
    @click="emit('click')"
  >
    <h1>{{ $t('enrollment-declined') }}</h1>
    {{ reason || $t('reason-not-specified') }}
  </image-and-button-layout>
</template>


<script setup lang="ts">
import { ImageAndButtonLayout } from '@/shared'

defineProps<{
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
</fluent>


<fluent locale="ru">
enrollment-declined = Заявка отклонена
go-back = Назад
reason-not-specified = Причина не указана
</fluent>
