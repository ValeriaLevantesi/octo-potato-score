<template>
  <Transition name="fade">
    <div 
      v-if="visible" 
      class="absolute right-0 top-full mt-2 z-20"
    >
      <slot></slot>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  visible: boolean
}>()
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style> 