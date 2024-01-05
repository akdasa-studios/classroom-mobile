<template>
  <span />
</template>


<script setup lang="ts">
import * as confetti from 'canvas-confetti'
import { onMounted } from 'vue'

/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

onMounted(onEnter)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onEnter() {
  let shotsRemains = 3

  function s() {
    shotsRemains -= 1
    shoot()
    if (shotsRemains > 0) { setTimeout(() => s(), (Math.random()+.3) * 2000) }
  }

  s()
}

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

function shoot() {
  const count = 200
  const defaults = {
    origin: { y: .9 }
  }

  function fire(particleRatio: number, opts: any) {
    confetti.default({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    })
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
  })
  fire(0.2, {
    spread: 60,
  })
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8
  })
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2
  })
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
  })
}
</script>
