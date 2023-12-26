<template>
  <help-text>
    Enter the <b>code</b> that we have sent to your email
  </help-text>
  <code-input v-bind="$attrs" />
</template>


<script lang="ts" setup>
import { CodeInput, HelpText } from '@/auth'
</script>
