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
      :state="(states[idx] as LessonSectionVideoBlockState)"
      @change="data => onBlockStateChanged(idx, data)"
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
      :state="(states[idx] as LessonSectionQuizBlockState)"
      @change="data => onBlockStateChanged(idx, data)"
    />
    <div v-else>
      Unsupported block type: {{ block.type }}
    </div>
  </div>
</template>


<script setup lang="ts">
import { QuizSectionBlock, VideoSectionBlock, TextSectionBlock, LessonSection, LessonSectionBlockState, LessonSectionVideoBlockState, LessonSectionQuizBlockState } from '@/education'
import { toRefs } from 'vue'

/* -------------------------------------------------------------------------- */
/*                                  Interface                                 */
/* -------------------------------------------------------------------------- */

const props = defineProps<{
  section: LessonSection
  states: LessonSectionBlockState[]
}>()

const emit = defineEmits<{
  change: [states: LessonSectionBlockState[]]
}>()


/* -------------------------------------------------------------------------- */
/*                                    State                                   */
/* -------------------------------------------------------------------------- */

const { states } = toRefs(props)


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
  return `${props.section.id}::${blockIndex}`
}
</script>
