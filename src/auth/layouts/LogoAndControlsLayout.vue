<template>
  <div class="logo-section">
    <slot name="logo" />
  </div>
  <div class="controls-section">
    <slot name="controls" />
  </div>
</template>


<style scoped>
.logo-section {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
  align-items: center;
}

.controls-section {
  display: flex;
  flex-direction: column;
}
</style>
