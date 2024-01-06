<template>
  <PageWithHeaderLayout
    :title="$t('education')"
    :has-padding="true"
  >
    <template #content>
      <h1>{{ $t('enrollments') }}</h1>
      <my-enrollments-list />

      <h1>{{ $t('homework') }}</h1>
    </template>
  </PageWithHeaderLayout>
</template>


<script setup lang="ts">
import { MyEnrollmentsList } from '@/education'
import { PageWithHeaderLayout } from '@/shared'
</script>


<fluent locale="en">
education   = My Lessons
enrollments = Groups
homework    = Homework
</fluent>

<fluent locale="ru">
education   = Мои уроки
enrollments = Группы
homework    = Домашняя работа
</fluent>