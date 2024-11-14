<template>
  <div class="min-h-screen bg-white">
    <!-- Fixed Header -->
    <header class="fixed top-0 left-0 right-0 bg-white shadow-[0_8px_24px_0_rgba(55,73,87,0.10)] z-10">
      <div class="flex justify-between items-center px-8 h-[64px] relative">
        <div class="w-6"></div>
        <h1 class="font-bold text-[#374957] absolute left-1/2 -translate-x-1/2 text-base leading-none">
          Candidates
        </h1>
        <button
          class="w-12 h-12 flex items-center justify-center text-[#9333EA] hover:text-purple-700 transition-colors"
          aria-label="Add candidate"
          @click="router.push('/create-candidate')"
          type="button"
        >
          <span class="w-8 h-8 flex items-center justify-center text-3xl">+</span>
        </button>
      </div>
    </header>

    <div class="p-6 pt-24">
      <div class="space-y-4">
        <button
          v-for="candidate in candidates" 
          :key="candidate.id"
          @click="router.push(`/score/${candidate.id}`)"
          class="w-full bg-white rounded-2xl shadow-[0_8px_24px_0_rgba(55,73,87,0.10)] p-4 hover:bg-gray-50 transition-colors"
        >
          <div class="flex items-center justify-between">
            <span class="text-[#374957] text-base font-medium">{{ candidate.name }}</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-[#9747FF]">
              <path d="M9 18L15 12L9 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from '#app'
import { useAppState } from '~/composables/useAppState'

const router = useRouter()
const appState = useAppState()
const candidates = computed(() => {
  console.log('Current candidates:', appState.candidates.value)
  return appState.candidates.value
})
</script>