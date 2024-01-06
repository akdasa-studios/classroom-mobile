<template>
  <image-and-button-layout
    image="/wait.webp"
    :action="$t('wait-more')"
    @click="emit('click')"
  >
    <h1>{{ $t('wait') }}</h1>
    {{ $t('in-progress') }}
  </image-and-button-layout>
</template>


<script setup lang="ts">
import { ImageAndButtonLayout } from '@/shared'

const emit = defineEmits<{
  click: []
}>()
</script>


<fluent locale="en">
wait = Wait
in-progress = Заявка на рассмотрении
wait-more = Wait more
</fluent>


<fluent locale="ru">
wait = Ожидайте
in-progress = Заявка на рассмотрении
wait-more = Подождать еще
</fluent>
