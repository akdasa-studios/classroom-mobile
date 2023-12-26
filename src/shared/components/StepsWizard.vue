<template>
  <div
    v-for="a in [0,1]"
    :key="a"
  >
    <slot
      v-if="a == props.currentStep"
      :name="'item'+a.toString()"
    />
  </div>
</template>


<script lang="ts" setup>
const props = defineProps<{
  stepsCount: number
  currentStep: number
}>();
</script>
