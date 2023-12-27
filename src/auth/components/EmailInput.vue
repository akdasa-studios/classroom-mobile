<template>
  <with-borders>
    <ion-input
      v-bind="$attrs"
      type="email"
      placeholder="Email"
      autocomplete="email"
      inputmode="email"
      pattern="email"
    />
  </with-borders>
</template>


<script lang="ts" setup>
import { IonInput } from '@ionic/vue'
import { WithBorders } from '@/shared'
</script>
