<template>
  <div class="content-section">
    <slot name="content" />
  </div>
  <div class="controls-section">
    <slot name="controls" />
  </div>
</template>


<style scoped>
.content-section {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content:flex-start;
  align-items:start;
}

.controls-section {
  display: flex;
  flex-direction: column;
}
</style>
