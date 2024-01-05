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

  const end = Date.now() + (3 * 1000)

  function frame() {
    confetti.default({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0, y: .65 },
    })
    confetti.default({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1, y: .65 },
    })

    if (Date.now() < end) {
      requestAnimationFrame(frame)
    }
  }

  frame()
}
</script>
