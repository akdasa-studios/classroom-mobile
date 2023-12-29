<template>
  <with-borders>
    <ion-input
      v-bind="$attrs"
      type="number"
      :placeholder="$t('code')"
    />
  </with-borders>
</template>


<script lang="ts" setup>
import { IonInput  } from '@ionic/vue'
import { WithBorders } from '@/shared'
</script>


<fluent locale="en">
code = Code
</fluent>
