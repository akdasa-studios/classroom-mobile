<template>
  <WithBorders>
    <IonInput
      v-bind="$attrs"
      type="email"
      :placeholder="$t('email')"
      autocomplete="email"
      inputmode="email"
      pattern="email"
    />
  </WithBorders>
</template>


<script lang="ts" setup>
import { IonInput } from '@ionic/vue'
import { WithBorders } from '@/shared'
</script>


<fluent locale="en">
email = EMail
</fluent>
