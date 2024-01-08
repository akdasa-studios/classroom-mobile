<template>
  <!-- eslint-disable-next-line vue/no-v-html -->
  <div v-html="renderedContent" />
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
