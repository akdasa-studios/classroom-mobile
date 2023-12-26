<template>
  <with-borders>
    <ion-input
      v-bind="$attrs"
      type="email"
      placeholder="Email"
      autocomplete="email"
      inputmode="email"
      pattern="email"
    >
      <ion-icon
        slot="end"
        :icon="mailOutline"
        aria-hidden="true"
      />
    </ion-input>
  </with-borders>
</template>


<script lang="ts" setup>
import { IonInput, IonIcon } from '@ionic/vue'
import { mailOutline } from 'ionicons/icons'
import { WithBorders } from '@/shared'
</script>