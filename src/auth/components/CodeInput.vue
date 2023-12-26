<template>
  <with-borders>
    <ion-input
      v-bind="$attrs"
      type="number"
      placeholder="Code"
    >
      <ion-icon
        slot="end"
        :icon="keyOutline"
        aria-hidden="true"
      />
    </ion-input>
  </with-borders>
</template>


<script lang="ts" setup>
import { IonInput, IonIcon } from '@ionic/vue'
import { keyOutline } from 'ionicons/icons'
import { WithBorders } from '@/shared'
</script>