<template>
  <Vue3Lottie
    v-bind="$attrs"
    :animation-data="animationData"
    :loop="loop"
    class="icon"
    @on-complete="onAnimationComplete"
  />
</template>


<script setup lang="ts">
import { Vue3Lottie } from 'vue3-lottie'
import { ref, shallowRef } from 'vue'

import AnimationIn from './in.json'
import AnimationLoop from './loop.json'

const animationData = shallowRef<any>(AnimationIn)
const loop = ref(false)

function onAnimationComplete() {
  animationData.value = AnimationLoop
  loop.value = true
}
</script>


<style scoped>
.icon {
  max-width: 32px;
  max-height: 32px;
}
</style>