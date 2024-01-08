<template>
  <div
    v-for="block, idx in section.blocks"
    :key="getBlockId(idx)"
  >
    <video-section-block
      v-if="block.type === 'video'"
      :video-url="block.videoUrl"
      :poster-url="block.posterUrl"
      :timestamps="block.timestamps"
    />
    <text-section-block
      v-else-if="block.type === 'text'"
      :content="block.content"
    />
    <quiz-section-block
      v-else-if="block.type === 'quiz'"
      :question="block.question"
      :answers="block.answers"
      :right-answer="block.rightAnswer"
      @state-change="(value) => onStateChange(idx, value)"
    />
    <div v-else>
      Unsupported block type: {{ block.type }}
    </div>
  </div>
</template>


<script setup lang="ts">
import { LessonSection, QuizSectionBlock, VideoSectionBlock, TextSectionBlock, StudentHomework } from '@/education'

const props = defineProps<{
  section: LessonSection
  homework: StudentHomework
}>()

const state = []

function onStateChange(
  blockId: number,
  value: any
) {
  state[blockId] = value
  console.log(state)
}

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                  */
/* -------------------------------------------------------------------------- */

function getBlockId(blockIndex: number) {
  return `${props.section.id.value}::${blockIndex}`
}
</script>
