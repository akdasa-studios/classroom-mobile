<template>
  <Vue3Lottie
    v-bind="$attrs"
    :animation-data="AnimationIn"
    :speed=".3"
    :delay="1500"
    :loop="false"
  />
</template>


<script setup lang="ts">
import { Vue3Lottie } from 'vue3-lottie'
import AnimationIn from './in.json'
</script>
