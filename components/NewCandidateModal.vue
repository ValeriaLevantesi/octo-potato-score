<template>
  <Teleport to="body">
    <div 
      v-if="isOpen" 
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]"
    >
      <div class="bg-white rounded-2xl p-8 max-w-lg w-full mx-4">
        <div class="flex justify-between items-center mb-8">
          <h2 class="text-xl font-bold text-[#374957]">New candidate</h2>
          <button 
            @click="$emit('close')" 
            class="text-gray-500 hover:text-gray-700"
            type="button"
          >
            <span class="sr-only">Close</span>
            <svg class="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form @submit.prevent="handleSubmit">
          <div class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">Name</label>
              <input
                v-model="name"
                type="text"
                required
                class="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-purple-500 focus:border-purple-500"
                placeholder="Insert candidate name"
              />
            </div>
            
            <button
              type="submit"
              class="w-full bg-[#9333EA] text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch } from '#imports'

const props = defineProps<{
  isOpen: boolean
}>()

watch(() => props.isOpen, (newValue) => {
  console.log('Modal isOpen changed:', newValue)
})

const emit = defineEmits<{
  close: []
  create: [{ name: string }]
}>()

const name = ref('')

const handleSubmit = () => {
  emit('create', { name: name.value })
  name.value = ''
}
</script>