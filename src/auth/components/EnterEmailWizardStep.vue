<template>
  <div>
    <help-text>
      <b>Welcome to the School of Devotion!</b> Enter your email and we will send you a code to log in.
    </help-text>
    <email-input v-bind="$attrs" />
  </div>
</template>


<script lang="ts" setup>
import { EmailInput, HelpText } from '@/auth'
</script>
