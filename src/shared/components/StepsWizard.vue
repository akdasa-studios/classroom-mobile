<template>
  <slot
    :name="'item' + props.currentStep.toString()"
  />
</template>


<script lang="ts" setup>
const props = defineProps<{
  currentStep: number
}>();
</script>
