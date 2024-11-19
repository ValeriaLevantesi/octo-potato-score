<template>
  <div 
    v-if="visible" 
    class="absolute bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10 mt-2" 
    style="top: 100%; right: 0;"
  >
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  visible: {
    type: Boolean,
    required: true
  }
})
</script>

<style scoped>
/* Add any additional styles for the popover here */
</style> 