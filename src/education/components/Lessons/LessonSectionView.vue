<template>
  <div
    v-for="block, idx in section.blocks"
    :key="`${section.id.value} + ${block.type}` + idx"
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
    />
    <div v-else>
      Unsupported block type: {{ block.type }}
    </div>
  </div>
</template>


<script setup lang="ts">
import { LessonSection, QuizSectionBlock, VideoSectionBlock, TextSectionBlock } from '@/education'

defineProps<{
  section: LessonSection
}>()
</script>
