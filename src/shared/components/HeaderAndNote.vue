<template>
  <h2>{{ header }}</h2>
  <p v-if="note">
    {{ note }}
  </p>
</template>


<script lang="ts" setup>
defineProps<{
  header: string,
  note?: string
}>()
</script>
