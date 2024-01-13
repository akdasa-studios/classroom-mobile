<template>
  <div
    class="ion-padding-start ion-padding-end"
    v-html="renderedContent"
  />
</template>


<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { Marked } from '@ts-stack/markdown'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  content: string
}>()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const renderedContent = ref('')

/* -------------------------------------------------------------------------- */
/*                                    Hooks                                   */
/* -------------------------------------------------------------------------- */

onMounted(onEnter)


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

async function onEnter() {
  renderedContent.value = Marked.parse(props.content)
}
</script>
