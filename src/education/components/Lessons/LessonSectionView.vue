<template>
  <div
    v-for="block, idx in blocks"
    :key="getBlockId(idx)"
  >
    <component
      v-bind="test(block)"
      :is="getComponent(block.type)"
      :state="(states[idx] as LessonSectionVideoBlockState)"
      @change="(data: any) => onBlockStateChanged(idx, data)"
    />
  </div>
</template>


<script setup lang="ts">
import {
  QuizSectionBlock, VideoSectionBlock, TextSectionBlock,
  LessonSectionBlockState, LessonSectionVideoBlockState,
  LessonSectionBlock
} from '@/education'
import { toRef } from 'vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  /** Section of a lesson to display */
  blocks: LessonSectionBlock[]

  /** Homework attached to this section */
  states: LessonSectionBlockState[]
}>()


const emit = defineEmits<{
  change: [states: LessonSectionBlockState[]],
}>()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const states = toRef(props, 'states')


/* -------------------------------------------------------------------------- */
/*                                  Handlers                                  */
/* -------------------------------------------------------------------------- */

function onBlockStateChanged(idx: number, data: any) {
  states.value[idx] = data
  emit('change', states.value)
}


/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

function getBlockId(blockIndex: number) {
  return `${blockIndex}`
}


function getComponent(type: string) {
  if (type === 'video') { return VideoSectionBlock }
  if (type === 'quiz') { return QuizSectionBlock }
  if (type === 'text') { return TextSectionBlock }
}


function test(obj: any) {
  const {type, ...rest} = obj
  return rest
}
</script>
